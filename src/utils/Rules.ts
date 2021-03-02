import * as _ from "lodash";
import { isEmptyVal } from "./index";

export const phoneRegex = /^(?:\+?86)?1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[35678]\d{2}|4(?:0\d|1[0-2]|9\d))|9[189]\d{2}|66\d{2})\d{6}$/;
export const companyRegex = /^[\(\)\（\）\·\,\sa-zA-Z\u4E00-\u9FA5]+$/;

export const idCardRegex = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;

export const nameRegex = /^[\·\sa-zA-Z\u4E00-\u9FA5]+$/;

export const nameStrictRegex = /^[\w\u4E00-\u9FA5]+$/;

export const safeCodeRegx = /^[0-9]{6}$/;

export const bankNoRegx = /^[1-9][0-9]{11}[0-9]*$/;

export const postalRegx = /^[0-9]{6}$/; //邮编

//至少包含字母、数字、特殊符号中的两种，长度大于6位
const passReg = /^((?=.*[A-Za-z])|(?=.*\d))((?=.*[A-Za-z])|(?=.*[$@$!%*#?&]))((?=.*[$@$!%*#?&])|(?=.*\d))[A-Za-z\d$@$!%*#?&]{6,20}$/;

//包含字母、数字，长度大于6位
export const passSimpleReg = /^(?=.*\d)(?=.*[a-zA-Z]).{6,20}$/;

export const specialPattern = new RegExp("[`~!@#$^&*=|{}\\[\\]<>/?~！@#￥&*——|{}]");

export function isPhone(value) {
  if (phoneRegex.test(_.toString(value))) {
    return;
  }
  return "请填写正确的手机号码";
}

export function isBankNo(value) {
  if (bankNoRegx.test(_.toString(value))) {
    return;
  }
  return "请填写正确的银行卡号";
}

export function isPostalCode(value) {
  if (postalRegx.test(_.toString(value))) {
    return;
  }
  return "请填写正确的邮政编码";
}

export function isPwd(value) {
  if (passReg.test(_.toString(value))) {
    return;
  }
  return "请填写正确格式的密码";
}

export function isIdCard(value) {
  if (idCardRegex.test(_.toString(value))) {
    return;
  }
  return "请填写正确的身份证号码";
}

export function isSafeCode(value) {
  if (!safeCodeRegx.test(value)) {
    return "请填写正确的验证码";
  }
}

export function isCompany(value) {
  if (companyRegex.test(_.trim(_.toString(value)))) {
    return;
  }
  return "请填写正确的公司名称";
}

export function isName(value) {
  if (nameStrictRegex.test(_.toString(value))) {
    return;
  }
  return "请填写正确的名称";
}

export const isNameMsg = (msg = "请填写正确的名称") => value => {
  if (nameStrictRegex.test(_.toString(value))) {
    return;
  }
  return msg;
};

export const isEmpty = msg => data => {
  return isEmptyVal(data) && msg;
};

export const filterSpecialStr = (str = "") => {
  if (isEmptyVal(str)) {
    return "";
  }

  return _.reduce(
    _.times(str.length),
    (specialStr, index) => {
      specialStr += str.substr(index, 1).replace(specialPattern, "");

      return specialStr;
    },
    ""
  );
};

export const numberRegx = (precision = 6) => new RegExp(`^([0-9]d*)+(.[0-9]{1,${precision}})?$`);

export const numberError = "请输入正确的数值";

export const numberAccuracy = (msg = numberError, precision = 6) => (value) => {
  if (numberRegx(precision).test(value)) {
    return;
  }

  return msg;
};
