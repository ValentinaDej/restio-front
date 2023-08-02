import { PERSONNEL } from './personnel';
import { instance } from 'api';

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

export const getNewToken = async () => {
  const USER = `${PERSONNEL}/${getUserId()}`;
  const USER_TOKEN = `${USER}/tokens`;
  instance
    .get(USER_TOKEN, getTokenConfig())
    .then(({ data }) => {
      localStorage.setItem('userData', data.token);
      localStorage.setItem('userData', data.refreshToken);
    })
    .catch(() => {
      localStorage.removeItem('userData');
      location.reload();
    });
};

export function getRefreshToken() {
  const storedToken = localStorage.getItem('userData');
  let token = '';
  if (typeof storedToken === 'string') {
    const userData = JSON.parse(storedToken);
    token = userData.refreshToken;
  }
  return token;
}

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
        throw new Error('Unauthorized. Please check your email and password.');
      } else if (status === 403) {
        throw new Error('Your password is incorrect. Please check your credentials.');
      } else if (status === 404) {
        throw new Error('This email does not exist. Please check your credentials.');
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
