import { instance } from 'api';
import axios from 'axios';
import { errorMessage } from 'helpers/errorMessage';
import { toast } from 'react-hot-toast';

export const uploadFiles = async (uploadedFile) => {
  try {
    if (!uploadedFile) {
      return '';
    }
    const response = await instance(
      `api/upload?type=${uploadedFile.type}&size=${uploadedFile.size}`
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
    return response.data.imageName;
  } catch (error) {
    errorMessage(error.response.data.message);
  }
};
