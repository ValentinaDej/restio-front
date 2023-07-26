import React, { forwardRef, useImperativeHandle, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import styles from './FileUploader.module.scss';

const ALLOWED_EXTENSIONS = ['png', 'jpeg', 'jpg', 'gif'];

const FileUploader = forwardRef(({ size }, ref) => {
  const [uploadedFile, setUploadedFile] = useState();
  const [previewUrl, setPreviewUrl] = useState('');

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

  return (
    <div>
      <div className={`${styles.fileUploader} ${styles[`fileUploader_${size}`]}`}>
        {previewUrl ? (
          <img src={previewUrl} alt="Preview" />
        ) : (
          <p>Drag & drop an image file here, or click to select one (jpeg, png, gif)</p>
        )}
        <input
          type="file"
          accept="image/jpeg, image/png, image/gif, image/jpg"
          onChange={onFileChange}
        />
      </div>
    </div>
  );
});

export default FileUploader;
