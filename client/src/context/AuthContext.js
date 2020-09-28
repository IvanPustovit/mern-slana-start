import { createContext } from "react";

function one() {}
export const AuthContext = createContext({
  token: null,
  userId: null,
  name: null,
  login: one,
  logout: one,
  isAuth: false,
  countCart: 0,
  totalOrder: one,
  listCart: null,
  formItem: null,
  formUpdate: one,
});
