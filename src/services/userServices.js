import req, { getToken } from '../httpService/generalHttpServiceAxios';
import jwt_decode from 'jwt-decode';

const tokenKey = 'token';

const userService = {
  register: async (user) => {
    const { userName, password, email } = user;
    await req({ method: 'post', data: { userName, password, email }, path: '/signup' });
  },

  login: async (user) => {
    const { password, email } = user;
    const res = await req({ method: 'post', data: { password, email }, path: '/login' });
    localStorage.token = res;
  },

  logout: () => localStorage.removeItem(tokenKey),

  getCurrentUser: () => {
    try {
      return jwt_decode(localStorage.getItem(tokenKey));
    } catch (error) {
      return null;
    }
  },

  getUserToken: () => {
    return localStorage.getItem(tokenKey);
  },
};

export default userService;

getToken(userService.getUserToken());
