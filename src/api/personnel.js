export const PERSONNEL = `/personnel`;

export const getPersonnelById = (id) => {
  return instance.get(`${PERSONNEL}/${id}`);
};

export const createPersonnel = async (body) => {
  try {
    await instance.post(`${PERSONNEL}`, body);
  } catch (error) {
    if (error.response) {
      const { status } = error.response;
      if (status === 400) {
        throw new Error('Bad request. Please provide valid credentials.');
      } else if (status === 401) {
        throw new Error('Unauthorized. Please check your email and password.');
      } else if (status === 403) {
        throw new Error('Forbidden. You do not have permission to access this resource.');
      } else if (status === 404) {
        throw new Error('Resource not found. Please try again later.');
      } else if (status === 500) {
        throw new Error('Internal server error. Please try again later.');
      }
    }

    throw new Error('An error occurred. Please try again later.');
  }
};

export const updatePersonnel = (id, body) => {
  return instance.put(`${PERSONNEL}/${id}`, body);
};

export const deletePersonnel = (id) => {
  return instance.delete(`${PERSONNEL}/${id}`);
};
