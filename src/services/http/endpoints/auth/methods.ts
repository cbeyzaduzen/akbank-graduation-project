import { instance, endpoints } from '../../instance';
import { User, LoginRequest, RegisterRequest } from './types';

export const login = async (data: LoginRequest) => {
  return instance.post<User>(endpoints.login, data)
    .then((response) => {
      instance.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      return response;
    })
}

export const register = async (data: RegisterRequest) => {
  return instance.post<User>(endpoints.register, data)
    .then((response) => {
      instance.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      return response;
    })
}

export const logout = () => {
  delete instance.defaults.headers.common['Authorization'];
}

