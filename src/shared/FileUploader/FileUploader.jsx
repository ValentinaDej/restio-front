import React, { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
//import axios from 'axios';
import toast from 'react-hot-toast';

import defaultImage from 'assets/img/defaultUploadImg.png';
import styles from './FileUploader.module.scss';
import { DownloadImgWithPrew } from 'shared';
import { BsTrash } from 'react-icons/bs';
import { uploadFiles } from 'api/upload';

export const FileUploader = forwardRef(({ onEditPhoto, size }, ref) => {
  const [uploadedFile, setUploadedFile] = useState();
  const [previewUrl, setPreviewUrl] = useState(onEditPhoto);

  const handleImagePrew = (image) => {
    setPreviewUrl(image);
  };

  const handleImageClear = (image) => {
    setPreviewUrl('');
  };

  const handleImageDownload = (image) => {
    setUploadedFile(image);
  };

  const handleUpload = async () => {
    try {
      const response = await uploadFiles(uploadedFile);
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
      setUploadedFile(null);
      setPreviewUrl('');
    },
  }));

  return (
    <div>
      <div className={`${styles.photoContainer} ${styles[`photoContainer_${size}`]}`}>
        <img src={previewUrl ? previewUrl : defaultImage} alt="Preview" className={styles.photo} />
        {previewUrl ? (
          <BsTrash onClick={handleImageClear} className={styles.deleteIcon} />
        ) : (
          <DownloadImgWithPrew
            handleImagePrew={handleImagePrew}
            handleImageDownload={handleImageDownload}
          />
        )}
      </div>
    </div>
  );
});
