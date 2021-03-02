import * as Nzh from "nzh";
import "nzh/cn";
import * as numeral from "numeral";
import "numeral/locales/chs";
import {isEmptyVal} from "./index";
import _, {isNumber, isString} from "lodash";

numeral.locale("chs");

const nzhcn = Nzh.cn;

export const formatCurrency = value => {
  if (isString(value)) {
    const money = parseFloat(value);

    if (!isEmptyVal(money)) {
      return numeral(money).format("$ 0,0.00");
    }
  } else if (isNumber(value)) {
    return numeral(value).format("$ 0,0.00");
  }

  return value;
};
export const toRMBMoney = (value = 0) => {
  let nzhMoney = nzhcn.toMoney(_.toNumber(value), {outSymbol: false});
  //	数字到元或角为止的，在“元”或“角”后应当写“整”
  if (_.endsWith(nzhMoney, "角")) {
    nzhMoney = nzhMoney + "整";
  }
  return nzhMoney || "零元整";
};

export const formatCurrencyNoDecimal = value => {
  if (isString(value)) {
    const money = parseFloat(value);

    if (!isEmptyVal(money)) {
      return numeral(money).format("$ 0,0");
    }
  } else if (isNumber(value)) {
    return numeral(value).format("$ 0,0");
  }

  return value;
};

export const formatCurrencyWithoutChar = (value = 0) => {
  if (isString(value)) {
    const money = parseFloat(value);

    if (!isEmptyVal(money)) {
      return numeral(money).format("0,0.00");
    }
  } else if (isNumber(value)) {
    return numeral(value).format("0,0.00");
  }

  return value;
};

export const formatPureMoney = value => {
  if (isString(value)) {
    const money = parseFloat(value);

    if (!isEmptyVal(money)) {
      return numeral(money).format("0.00");
    }
  } else if (isNumber(value)) {
    return numeral(value).format("0.00");
  }

  return value;
};

export const formatPureMoneyWithChar = value => {
  if (isString(value)) {
    const money = parseFloat(value);

    if (!isEmptyVal(money)) {
      return numeral(money).format("$0.00");
    }
  } else if (isNumber(value)) {
    return numeral(value).format("$0.00");
  }

  return value;
};

export const renderPercent = value => {
  if (value !== undefined && value !== null) {
    // 转为百分比展示,如数据为0.16666666666666666这个数据转换成16.67%，以及如果是0.5这种转换成50.00%格式。
    return (Math.round(value * 10000) / 100.0).toFixed(2) + "%";
  }
};


export const numToCnString = (value = 0) => {
  return nzhcn.encodeS(_.toNumber(value), {outSymbol: false});
};