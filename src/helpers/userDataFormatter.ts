import addMinutes from "date-fns/addMinutes";
import { User } from "../services/http/endpoints/auth";
import { deleteCookie, setCookie } from "./cookies";

export const saveUserData = (user: User) => {
  const expires = addMinutes(new Date(), 30).toUTCString();
  setCookie('token', user.token, expires);
  setCookie('userId', String(user.id), expires);
  setCookie('username', user.username, expires);
}

export const clearUserData = () => {
  deleteCookie('token');
  deleteCookie('userId');
  deleteCookie('username');
}