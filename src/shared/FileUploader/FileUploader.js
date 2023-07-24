import React, { forwardRef, useImperativeHandle, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import styles from './FileUploader.module.scss';

const FileUploader = forwardRef(({ size }, ref) => {
  const [uploadedFile, setUploadedFile] = useState();
  const [previewUrl, setPreviewUrl] = useState('');

  const onFileChange = (event) => {
    const file = event.target.files[0];
    setUploadedFile(file);
    // Create a temporary URL for image preview
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null); // or setPreviewUrl('')
    }
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('image', uploadedFile);

      const response = await axios.post('http://localhost:3001/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log(response);

      // Clear the selected file and preview after successful upload
      setPreviewUrl('');

      return response;
    } catch (error) {
      toast.error('Some error occurred uploading an image!');
      console.error('Error uploading file:', error);
      throw error;
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
        <input type="file" accept="image/jpeg, image/png, image/gif" onChange={onFileChange} />
      </div>
    </div>
  );
});

export default FileUploader;
