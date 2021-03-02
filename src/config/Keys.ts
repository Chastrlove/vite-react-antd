import * as localforage from "localforage";
import { UserDetailVo } from "api/auth/src/models/UserDetailVo";
// import { globalStore } from "stores/globalStore";
import { getAuth, removeAuth } from "config/AuthOperation";

export const USERINFO = "userManage-info";

export const UpdateUserInfo = (result: UserDetailVo) => {
  return localforage.setItem(USERINFO, result, (err, value) => {
    globalStore.updateGlobalUserInfo(result);
  });
};

export const expireLogout = inValidToken => {
  const curtToken = getAuth();
  //如果请求时无token，但是返回时已经存在cookie，那么不清（说明该接口太慢）
  if (!inValidToken && curtToken) {
    return;
  }

  //如果请求的token过期，但是该token已经不存在于cookie中，那么不执行操作
  if (inValidToken && inValidToken !== curtToken) {
    return;
  }

  removeAuth();
  globalStore.authStore.setAuthToken();
  localforage.removeItem(USERINFO, err => {
    globalStore.updateGlobalUserInfo(undefined);
  });
};

export const logout = () => {
  removeAuth();
  globalStore.authStore.setAuthToken();
  localforage.removeItem(USERINFO, err => {
    globalStore.updateGlobalUserInfo(undefined);
  });
};
