import React, { useState, useRef, useEffect } from 'react';
import Modal from 'shared/Modal/Modal'; // Замініть на власний шлях
import PropTypes from 'prop-types';
import ReactCrop, { centerCrop, makeAspectCrop, convertToPixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { canvasPreview } from './canvasPreview';
import { useDebounceEffect } from './useDebounceEffect';
import { LiaPlusSolid } from 'react-icons/lia';
import toast from 'react-hot-toast';
import classes from './DownloadImgWithPrew.module.scss';

const ALLOWED_EXTENSIONS = ['png', 'jpeg', 'jpg'];

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

const DownloadImgWithPrew = ({ handleImagePrew, handleImageDownload }) => {
  const [imgSrc, setImgSrc] = useState('');
  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);
  const hiddenAnchorRef = useRef(null);
  const blobUrlRef = useRef('');
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState(16 / 9);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef();

  const getFileExtension = (fileName) => {
    return fileName.split('.').pop().toLowerCase();
  };

  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      const fileExtension = getFileExtension(e.target.files[0].name);
      if (ALLOWED_EXTENSIONS.includes(fileExtension)) {
        setCrop(undefined);
        const reader = new FileReader();
        reader.addEventListener('load', () => setImgSrc(reader.result || ''));
        reader.readAsDataURL(e.target.files[0]);
        setIsModalOpen(true);
      } else {
        toast.error('Invalid file format. Allowed formats: png, jpeg, jpg');
      }
    }
  }

  function onImageLoad(e) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  function onDownloadCropClick() {
    if (!previewCanvasRef.current) {
      throw new Error('Crop canvas does not exist');
    }

    previewCanvasRef.current.toBlob((blob) => {
      if (!blob) {
        throw new Error('Failed to create blob');
      }
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
      }
      blobUrlRef.current = URL.createObjectURL(blob);
      hiddenAnchorRef.current.href = blobUrlRef.current;
      hiddenAnchorRef.current.click();
    });
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop, scale, rotate);
      }
    },
    100,
    [completedCrop, scale, rotate]
  );

  function handleToggleAspectClick() {
    if (aspect) {
      setAspect(undefined);
    } else if (imgRef.current) {
      const { width, height } = imgRef.current;
      setAspect(16 / 9);
      const newCrop = centerAspectCrop(width, height, 16 / 9);
      setCrop(newCrop);
      // Updates the preview
      setCompletedCrop(convertToPixelCrop(newCrop, width, height));
    }
  }

  const handleAddImage = () => {
    previewCanvasRef.current.toBlob((blob) => {
      if (!blob) {
        throw new Error('Failed to create blob');
      }
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
      }
      blobUrlRef.current = URL.createObjectURL(blob);
      handleImagePrew(blobUrlRef.current);
      handleImageDownload(blob);
      setIsModalOpen(false);
    });
  };

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="App">
      <div className="Crop-Controls">
        <div className={classes.addButton} onClick={handleFileInputClick}>
          <LiaPlusSolid className={`${classes.icon}`} />
          <input
            type="file"
            accept="image/jpeg, image/png, image/jpg"
            onChange={onSelectFile}
            className={classes.hiddenInput}
            ref={fileInputRef}
          />
        </div>
      </div>
      {imgSrc && (
        <Modal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}>
          <div>
            <label htmlFor="scale-input">Scale: </label>
            <input
              id="scale-input"
              type="number"
              step="0.1"
              value={scale}
              disabled={!imgSrc}
              onChange={(e) => setScale(Number(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="rotate-input">Rotate: </label>
            <input
              id="rotate-input"
              type="number"
              value={rotate}
              disabled={!imgSrc}
              onChange={(e) => setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))}
            />
          </div>
          <div>
            <button onClick={handleToggleAspectClick}>Toggle aspect {aspect ? 'off' : 'on'}</button>
          </div>
          {imgSrc && (
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspect}
            >
              <img
                ref={imgRef}
                alt="Crop me"
                src={imgSrc}
                style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                onLoad={onImageLoad}
              />
            </ReactCrop>
          )}
          {completedCrop && (
            <>
              <div>
                <canvas
                  ref={previewCanvasRef}
                  style={{
                    border: '1px solid black',
                    objectFit: 'contain',
                    width: completedCrop.width,
                    height: completedCrop.height,
                  }}
                />
              </div>
              <div>
                <button onClick={onDownloadCropClick}>Download Crop</button>
                <button onClick={handleAddImage}>Додати</button>
                <a
                  ref={hiddenAnchorRef}
                  download
                  style={{
                    position: 'absolute',
                    top: '-200vh',
                    visibility: 'hidden',
                  }}
                >
                  Hidden download
                </a>
              </div>
            </>
          )}
        </Modal>
      )}
    </div>
  );
};

DownloadImgWithPrew.propTypes = {
  handleImagePrew: PropTypes.func.isRequired,
  handleImageDownload: PropTypes.func.isRequired,
};

export default DownloadImgWithPrew;
