import React, { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

import defaultImage from 'assets/img/defaultUploadImg.png';
import styles from './FileUploader.module.scss';
import { DownloadImgWithPrew } from 'shared';

export const FileUploader = forwardRef(({ onEditPhoto, size }, ref) => {
  const [uploadedFile, setUploadedFile] = useState();
  const [previewUrl, setPreviewUrl] = useState(onEditPhoto);

  const handleImagePrew = (image) => {
    setPreviewUrl(image);
  };

  const handleImageDownload = (image) => {
    setUploadedFile(image);
  };

  const handleUpload = async () => {
    try {
      if (!uploadedFile) {
        return '';
      }
      const response = await axios.get(
        `http://localhost:3001/api/upload?type=${uploadedFile.type}&size=${uploadedFile.size}`
      );
      await axios
        .put(response.data.uploadURL, uploadedFile, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .catch(() => {
          toast.error('Some error occurred uploading an image!');
        });
      // Clear the selected file and preview after successful upload
      setUploadedFile(null);
      setPreviewUrl('');
      return response.data.imageName;
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

  return (
    <div>
      <div className={`${styles.photoContainer} ${styles[`photoContainer_${size}`]}`}>
        <img src={previewUrl ? previewUrl : defaultImage} alt="Preview" className={styles.photo} />
        <DownloadImgWithPrew
          handleImagePrew={handleImagePrew}
          handleImageDownload={handleImageDownload}
        />
      </div>
    </div>
  );
});
