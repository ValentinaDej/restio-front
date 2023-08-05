import React, { forwardRef, useRef, useImperativeHandle, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

import { LiaPlusSolid } from 'react-icons/lia';

import defaultImage from '../../img/defaultUploadImg.png';
import styles from './FileUploader.module.scss';

const ALLOWED_EXTENSIONS = ['png', 'jpeg', 'jpg', 'gif'];

const FileUploader = forwardRef(({ size }, ref) => {
  const [uploadedFile, setUploadedFile] = useState();
  const [previewUrl, setPreviewUrl] = useState('');
  const fileInputRef = useRef();

  const getFileExtension = (fileName) => {
    return fileName.split('.').pop().toLowerCase();
  };

  const onFileChange = (event) => {
    const file = event.target.files[0];
    const fileExtension = getFileExtension(file.name);
    if (ALLOWED_EXTENSIONS.includes(fileExtension)) {
      setUploadedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      toast.error('Invalid file format. Allowed formats: png, jpeg, jpg, gif');
    }
  };

  const handleUpload = async () => {
    try {
      if (!uploadedFile) {
        return '';
      }

      const formData = new FormData();
      formData.append('image', uploadedFile);

      const response = await axios.post('http://localhost:3001/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Clear the selected file and preview after successful upload
      setUploadedFile(null);
      setPreviewUrl('');

      return response;
    } catch (error) {
      toast.error('Some error occurred uploading an image!');
    }
  };

  useImperativeHandle(ref, () => ({
    handleUpload: handleUpload,
    clearFile: () => {
      // Clear the selected file and preview
      setUploadedFile(null);
      setPreviewUrl('');
    },
  }));

  const handleFileInputClick = () => {
    // Проксімований клік на інпут, щоб відкрити вікно вибору файлу
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div>
      <div className={`${styles.photoContainer} ${styles[`photoContainer_${size}`]}`}>
        {/* {previewUrl ? (
        
        ) : (
          <p>Drag & drop an image file here, or click to select one (jpeg, png, gif)</p>
        )} */}
        <img src={previewUrl ? previewUrl : defaultImage} alt="Preview" className={styles.photo} />
        <div className={styles.addButton} onClick={handleFileInputClick}>
          <LiaPlusSolid className={`${styles.icon} ${styles[`icon_${size}`]}`} />
          <input
            type="file"
            accept="image/jpeg, image/png, image/gif, image/jpg"
            onChange={onFileChange}
            ref={fileInputRef}
            className={styles.hiddenInput}
          />
        </div>
      </div>
    </div>
  );
});

export default FileUploader;
