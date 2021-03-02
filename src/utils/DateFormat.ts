import * as _ from "lodash";
import { isEmptyVal } from "./index";
import moment from "moment";
import "moment/locale/zh-cn";

moment.locale("zh-cn");

export const dateTime = "YYYY-MM-DD HH:mm:ss";

export const dateTimeNoSecond = "YYYY-MM-DD HH:mm";
export const dateTimeNoSecondZHCN = "YYYY年MM月DD日 HH:mm";

export const dateFormatStr = "YYYY-MM-DD";

export const dateFormatSlash = "YYYY/MM/DD";

export const dateFormatMonth = "YYYY-MM";

export const dateTimeReg = /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/;

export const dateTimeFormater = (value?: any, formatDateTime = dateFormatStr): string => {
  if (_.isString(value)) {
    // if (_.endsWith(value, "Z") && dateTimeReg.test(value.split("T")[0])) {
    //   return moment(value).format(formatDateTime);
    // }
    // return value;

    if (dateIsValid(value)) {
      return moment(value).format(formatDateTime);
    }

    return value;
  } else if (_.isDate(value)) {
    return moment(value).format(formatDateTime);
  } else if (moment.isMoment(value)) {
    return value.format(formatDateTime);
  }

  return value;
};

export const dateTimeFormaterDefault = (value?: any): string => {
  if (_.isString(value)) {
    if (_.endsWith(value, "Z") && dateTimeReg.test(value.split("T")[0])) {
      return moment(value).format(dateTime);
    }
    return value;
  } else if (_.isDate(value)) {
    return moment(value).format(dateTime);
  }
  return value;
};

export const getCurrentDate = () => {
  const dateTimeFormat = "YYYYMMDD";

  return moment(Date.now()).format(dateTimeFormat);
};

export const dateFormater = (value?: any, dateFormat = "YYYY-MM-DD"): string => {
  if (_.isString(value)) {
    if (_.endsWith(value, "Z") && dateTimeReg.test(value.split("T")[0])) {
      return moment(value).format(dateFormat);
    }
    if (!isNaN(Number(value))) {
      return moment(Number(value)).format(dateFormat);
    }
    return value;
  }
  if (isEmptyVal(value)) {
    return value;
  }
  return moment(value).format(dateFormat);
};

export const dateFormatZH = (date) => {
  return moment(date, ["YYYY年MM月DD日"]).format("YYYY-MM-DD");
};

export const dateFormat = (value) => {
  return dateFormater(value, dateFormatStr);
};

export const dateTimeFormatNoSecond = (value) => {
  return dateFormater(value, dateTimeNoSecond);
};

export const dateTimeFormat = (value) => {
  return dateFormater(value, dateTime);
};

export const momentToString = (momentDate: moment.Moment, formatString = dateTime) => {
  if (momentDate) {
    return momentDate.format(formatString).toLocaleString();
  }

  return "";
};

export const stringToDate = (dateStr, formatDate = dateFormatStr) => {
  if (dateStr) {
    return moment(dateStr).format(formatDate);
  }

  return dateStr;
};

export const printStringToDate = (dateStr) => {
  if (!_.isEmpty(dateStr)) {
    return moment(dateStr).format("YYYY-MM-DD");
  }

  return dateStr;
};

export const printNumberToDate = (value, formatDate = dateFormatMonth) => {
  if (!isEmptyVal(value)) {
    return moment(value).format(formatDate);
  }

  return value;
};

/**
 * moment对象转秒
 */
export function momentToUnix(time: moment.Moment) {
  if (!isEmptyVal(time) && moment.isMoment(time)) {
    return time.unix();
  }

  return time;
}

/**
 * 时间戳秒format
 */
export function unixFormat(time: number | undefined, formatStr = dateFormatStr) {
  if (!isEmptyVal(time)) {
    return moment.unix(time!!).format(formatStr);
  }

  return time;
}

export function getRecentDate(offset) {
  const startToday = moment().startOf("day");
  const lastDay = moment().startOf("day").add(offset, "days");
  if (offset > 0) {
    return { startTime: startToday.toDate(), endTime: lastDay.toDate() };
  } else {
    return { startTime: lastDay.toDate(), endTime: startToday.toDate() };
  }
}

// 判断是否是时间
export const dateIsValid = (value?: any): boolean => {
  return moment(value).isValid();
};

export const momentInit = (dateString) => {
  //ios safari 下无法解析2019-07-30T16:00:00.000+0000这样格式的时间
  return moment(_.replace(dateString, /(\+\d{2})(\d{2})$/, "$1:$2"));
};
