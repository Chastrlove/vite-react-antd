import * as localforage from "localforage";
import { USERINFO } from "config/Keys";
import { UserDetailVo } from "api/auth/src";

const baiduTJ = "taotezi_baidu_tj";

const customEnv = process.env.CUSTOM_ENV;

export const initBaiduTongJi = () => {
  if (customEnv === "pro" && process.browser) {
    window._hmt = window._hmt || [];

    const netIp = (window.returnCitySN && window.returnCitySN["cip"]) || "";

    localforage.getItem(USERINFO, (err, value: UserDetailVo) => {
      const { mobile = "", realName } = value || {};

      if (mobile) {
        window._hmt.push(["_setCustomVar", 1, "visitor", `${mobile}#${netIp}`, 3]);
      }

      insertBaiduScript();
    });
  }
};

/**
 * 插入百度统计脚本
 */
const insertBaiduScript = () => {
  const baidu_tj = document.getElementById(baiduTJ);

  baidu_tj && baidu_tj.remove();

  const hm = document.createElement("script");
  hm.setAttribute("id", baiduTJ);
  hm.src = "https://hm.baidu.com/hm.js?70aab7bf2baa4edee6e9066927801071";
  const s = document.getElementsByTagName("script")[0] as any;
  s.parentNode.insertBefore(hm, s);
};

export enum RegistryEventType {
  login = "登录",
  registry = "注册",
}

/**
 * 注册百度事件
 */
export const registryBaiDuEvent = (eventType = RegistryEventType.login, newMobile = "") => {
  if (customEnv === "pro" && process.browser) {
    window._hmt = window._hmt || [];

    const netIp = (window.returnCitySN && window.returnCitySN["cip"]) || "";

    if (newMobile) {
      return window._hmt.push(["_trackEvent", eventType, "click", `${newMobile}#${netIp}`]);
    }

    return localforage.getItem(USERINFO, (err, value: UserDetailVo) => {
      const { mobile = "", realName } = value || {};

      window._hmt.push(["_trackEvent", eventType, "click", `${mobile}#${netIp}`]);
    });
  }
};

initBaiduTongJi();
