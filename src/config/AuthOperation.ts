import * as jsCookie from "js-cookie";

export const Authorization = "TTZ_AUTH";

export const getAuth = () => {
  return jsCookie.get(Authorization);
};

export const setAuth = content => {
  return jsCookie.set(Authorization, content || "");
};

export const removeAuth = () => {
  jsCookie.remove(Authorization);
};
