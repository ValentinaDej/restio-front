import React, { useState, useRef, useEffect } from 'react';
import Modal from 'shared/Modal/Modal'; // Замініть на власний шлях
import PropTypes from 'prop-types';
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
  convertToPixelCrop,
} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { canvasPreview } from './canvasPreview';
import { useDebounceEffect } from './useDebounceEffect';

const DownloadImg = ({ setIsModalOpen, isModalOpen, selectedFile, handleImageAdd }) => {
  //   const [src, setSrc] = useState(URL.createObjectURL(selectedFile));
  const [src, setSrc] = useState(selectedFile);
  const [crop, setCrop] = useState({ aspect: 16 / 9 });
  const [image, setImage] = useState(null);
  const [output, setOutput] = useState(null);
  //   console.log(typeof src);
  //   console.log(typeof selectedFile);
  const handleAddImage = () => {
    if (croppedImage) {
      handleImageAdd(output);
    }
    setIsModalOpen(false);
  };

  const cropImageNow = () => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    // Converting to base64
    const base64Image = canvas.toDataURL('image/jpeg');
    setOutput(base64Image);
  };

  return (
    <div>
      <Modal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}>
        <div>
          <h2>Crop Image</h2>
          {src && (
            <div>
              <ReactCrop src={src} onImageLoaded={setImage} crop={crop} onChange={setCrop} />
              <button onClick={cropImageNow}>Crop</button>
              <div>{output && <img src={output} />}</div>
            </div>
          )}
        </div>
        <button onClick={handleAddImage}>Додати</button>
      </Modal>
    </div>
  );
};

DownloadImg.propTypes = {
  setIsModalOpen: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  handleImageAdd: PropTypes.func.isRequired,
};

export default DownloadImg;
