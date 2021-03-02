import { isServer } from "utils/index";

export const isMac = function () {
  if (isServer()) {
    return false;
  }
  return /macintosh|mac os x/i.test(navigator.userAgent);
};

/** * 是否为windows系统 * */
export const isWindows = function () {
  return /windows|win32/i.test(navigator.userAgent);
};
