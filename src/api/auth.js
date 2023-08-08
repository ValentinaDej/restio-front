import instance from 'api';

export const getTokenConfig = () => {
  return {
    headers: {
      Authorization: `Bearer ${getRefreshToken()}`,
    },
  };
};

export function getToken() {
  const storedToken = localStorage.getItem('userData');
  let token = '';
  if (typeof storedToken === 'string') {
    const userData = JSON.parse(storedToken);
    token = userData.token;
  }
  return token;
}

export function getRefreshToken() {
  const storedToken = localStorage.getItem('userData');
  let token = '';
  if (typeof storedToken === 'string') {
    const userData = JSON.parse(storedToken);
    token = userData.refreshToken;
  }
  return token;
}

export const getNewToken = async () => {
  const USER = `/tokens/${getUserId()}`;
  try {
    const response = await instance.get(USER, {
      headers: {
        Authorization: `Bearer ${getRefreshToken()}`,
      },
    });
    const { token, refreshToken } = response.data;
    const storedToken = localStorage.getItem('userData');
    if (typeof storedToken === 'string') {
      const userData = JSON.parse(storedToken);
      userData.token = token;
      userData.refreshToken = refreshToken;
      localStorage.setItem('userData', JSON.stringify(userData));
    }
    return token;
  } catch (error) {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        localStorage.removeItem('userData');
        window.location.replace('/login');
        return Promise.reject({ message: 'Please login again.' });
      } else if (status === 500) {
        return Promise.reject({ message: 'Server error. Please try again later.' });
      }
    }
    return Promise.reject({ message: 'An error occurred. Please try again later.' });
  }
};

export function getUserId() {
  const storedToken = localStorage.getItem('userData');
  if (!storedToken) return null;

  let id = null;

  try {
    const userData = JSON.parse(storedToken);
    if (userData && typeof userData.userId === 'string') {
      id = userData.userId;
    }
  } catch (error) {
    console.error('Error parsing user data:', error);
  }

  return id;
}

export async function checkUserAuthorization() {
  const storedToken = localStorage.getItem('userData');
  let user;
  if (typeof storedToken === 'string') {
    const userData = JSON.parse(storedToken);
    user = await getPersonnelById(userData.userId);
  } else {
    user = null;
  }
  return user;
}

export const loginPersonnel = async (body) => {
  try {
    const response = await instance.post('/login', body);
    return response.data;
  } catch (error) {
    if (error.response) {
      const { status } = error.response;
      if (status === 400) {
        throw new Error('Bad request. Please provide valid credentials.');
      } else if (status === 401) {
        throw new Error('Unauthorized. Please check your credentials.');
      } else if (status === 403) {
        throw new Error('Incorrect credentials. Please check your data.');
      } else if (status === 404) {
        throw new Error('Incorrect credentials. Please check your data.');
      } else if (status === 500) {
        throw new Error('Internal server error. Please try again later.');
      } else {
        throw new Error('Server error. Please try again later.');
      }
    } else {
      throw new Error('An error occurred. Please try again later.');
    }
  }
};
