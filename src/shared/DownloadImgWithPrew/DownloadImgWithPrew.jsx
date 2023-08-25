import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactCrop, { centerCrop, makeAspectCrop, convertToPixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { LiaPlusSolid } from 'react-icons/lia';

import { canvasPreview } from './canvasPreview';
import { useDebounceEffect } from './useDebounceEffect';

import toast from 'react-hot-toast';
import { Button, Modal, CheckBox } from 'shared';

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

export const DownloadImgWithPrew = ({ handleImagePrew, handleImageDownload }) => {
  const [imgSrc, setImgSrc] = useState('');
  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);
  const hiddenAnchorRef = useRef(null);
  const blobUrlRef = useRef('');
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState(1);
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
        setScale(1);
        setRotate(0);
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

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
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
      setAspect(1);
      const newCrop = centerAspectCrop(width, height, 1);
      setCrop(newCrop);
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

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const setDefaults = () => {
    setScale(1);
    setRotate(0);
    setAspect(1);
  };

  return (
    <div>
      <div>
        <div className={classes.addButton} onClick={handleFileInputClick}>
          <LiaPlusSolid className={`${classes.icon}`} />
          <input
            type="file"
            accept="image/jpeg, image/png, image/jpg"
            onChange={onSelectFile}
            className={classes.hidden}
            ref={fileInputRef}
          />
        </div>
      </div>
      {imgSrc && (
        <Modal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}>
          <div className={classes.field__wrapper_right}>
            <Button size={'sm'} onClick={handleAddImage}>
              Add to form
            </Button>
            <Button size={'sm'} onClick={onDownloadCropClick} mode={'outlined'}>
              Download
            </Button>
          </div>
          <div className={classes.controlsection__wrapper}>
            <div className={classes.sliderContainer}>
              <label htmlFor="scale-input">Scale </label>
              <input
                id="scale-input"
                type="range"
                min="0"
                max="3"
                step="0.1"
                value={scale}
                disabled={!imgSrc}
                onChange={(e) => setScale(Number(e.target.value))}
              />
            </div>
            <div className={classes.sliderContainer}>
              <label htmlFor="rotate-input">Rotate </label>
              <input
                id="rotate-input"
                type="range"
                min="-180"
                max="180"
                value={rotate}
                disabled={!imgSrc}
                onChange={(e) => setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))}
              />
            </div>
            <div>
              <CheckBox
                label={`Aspect ${aspect ? 'off' : 'on'}`}
                onChange={handleToggleAspectClick}
                ariaLabel="aspect"
                size={22}
              />
            </div>
            <Button size={'sm'} onClick={setDefaults} mode={'outlined'}>
              defaults
            </Button>
          </div>

          {imgSrc && (
            <div className={classes.section__wrapper}>
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={aspect}
                circularCrop={true}
              >
                <img
                  ref={imgRef}
                  alt="Crop me"
                  src={imgSrc}
                  style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                  onLoad={onImageLoad}
                  className={classes.img__wrapper}
                />
              </ReactCrop>
            </div>
          )}
          {completedCrop && (
            <>
              <div>
                <canvas ref={previewCanvasRef} className={classes.hidden} />
              </div>
              <div>
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
