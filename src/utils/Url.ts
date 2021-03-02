import { isEmptyVal } from "utils/index";

export type HTTPQuery = {
  [key: string]:
    | string
    | number
    | null
    | boolean
    | Array<string | number | null | boolean>
    | HTTPQuery
    | undefined;
};

export const getParams = () => {
  const url = window.location.search; //获取url中"?"符后的字串
  const theRequest = {};
  if (url.indexOf("?") !== -1) {
    let str = url.substr(1);
    const strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
    }
  }
  return theRequest;
};
export const joinLocationParams = <T = any>(location, state: T) => {
  if (isEmptyVal(state)) {
    return location;
  }

  return location + "?" + querystring(state as any);
};

export const querystring = (params: HTTPQuery, prefix: string = ""): string => {
  return Object.keys(params)
    .map((key) => {
      const fullKey = prefix + (prefix.length ? `[${key}]` : key);
      const value = params[key];
      if (value instanceof Array) {
        const multiValue = value
          .map((singleValue) => encodeURIComponent(String(singleValue)))
          .join(`&${encodeURIComponent(fullKey)}=`);
        return `${encodeURIComponent(fullKey)}=${multiValue}`;
      }
      if (value instanceof Object) {
        return querystring(value as HTTPQuery, fullKey);
      }
      return `${encodeURIComponent(fullKey)}=${encodeURIComponent(String(value))}`;
    })
    .filter((part) => part.length > 0)
    .join("&");
};

export function getQueryString(name) {
  const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  const urlObj = window.location;
  const r =
    urlObj.href.indexOf("#") > -1
      ? urlObj.hash.split("?")[1].match(reg)
      : urlObj.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

export function openUrl(url) {
  window.open(url);
}
