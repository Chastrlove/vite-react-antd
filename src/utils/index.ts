import * as _ from "lodash";
import { AreaVo } from "api/area/src";
import * as numeral from "numeral";
import "numeral/locales/chs";
import * as localforage from "localforage";
import { toJS } from "mobx";
import { IObject, IObjectValBean } from "interface/CommonInterface";

numeral.locale("chs");

export const TenThousandUnit = 10000;

export const formatCurrency = (value, multiplicationVal = TenThousandUnit, isNeedUnit = true) => {
  if (_.isString(value)) {
    const money = parseFloat(value);

    if (!isEmptyVal(money)) {
      return numeral(money * multiplicationVal).format(`${isNeedUnit ? "$" : ""} 0,0.00`);
    }
  } else if (_.isNumber(value)) {
    return numeral(value * multiplicationVal).format(`${isNeedUnit ? "$" : ""} 0,0.00`);
  }

  return value;
};

export const emptyMsg = (msg) => (data) => {
  return isEmptyVal(_.toString(data)) && msg;
};

export const amountHasMore = (amount) => {
  return amount > 99 ? "99+" : isEmptyVal(amount) ? 0 : amount;
};

export const pxToRem = (value) => {
  return value.replace(/([0-9.]+)px/gi, function (match, size) {
    return parseInt(size, 10) / 100 + "rem";
  });
};

export function isNullOrUndefined(value) {
  return null === value || undefined === value;
}

export function isEmptyVal(value) {
  if (value instanceof Date) {
    //_.isEmpty 无法判断Date类型
    return false;
  }
  return _.isNumber(value) ? _.isNaN(value) : _.isEmpty(value);
}

export function isEmptyObserveVal(value) {
  return isEmptyVal(toJS(value));
}

export function getLen(str) {
  let length = 0;
  const reg = /[\u4e00-\u9fa5]/;
  for (let i = 0; i < str.length; i++) {
    if (reg.test(str.charAt(i))) {
      length += 2;
    } else {
      length++;
    }
  }
  return length;
}

export const splitArrayKeys = (value, keys: Array<string>) => {
  return _.reduce(
    keys,
    (prev, cur, index) => {
      return _.assign(prev, {
        [cur]: value[index],
      });
    },
    {}
  );
};

/*export const getCursorPosition = (ctrl) => {
  //获取光标位置函数
  let CaretPos = 0; // IE Support
  if (document.selection) {
    ctrl.focus();
    const Sel = document.selection.createRange();
    Sel.moveStart("character", -ctrl.value.length);
    CaretPos = Sel.text.length;
  }
  // Firefox support
  else if (ctrl.selectionStart || ctrl.selectionStart === "0") CaretPos = ctrl.selectionStart;
  return CaretPos;
};*/

export const setCaretPosition = (inputEl, pos) => {
  inputEl.current.focus();
  inputEl.current.input.setSelectionRange(pos, pos);
};

export const pySegSort = (
  arr: Array<AreaVo>
): Array<{
  letter: string;
  data: Array<AreaVo>;
}> | null => {
  if (!String.prototype.localeCompare) return null;

  const letters = "*abcdefghjklmnopqrstwxyz".split("");
  const zh = "阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀".split("");

  const segs: Array<any> = [];
  let curr;
  _.each(letters, function (content, i) {
    curr = { letter: content, data: [] };
    _.each(arr, function (item) {
      //当 引用字符串 在 比较字符串 前面时返回 -1
      if (
        zh[i - 1]?.localeCompare(item.name ?? "", "zh") <= 0 &&
        item.name?.localeCompare(zh[i], "zh") === -1
      ) {
        curr.data.push(item);
      }
    });
    if (curr.data.length) {
      segs.push(curr);
      curr.data.sort(function (a, b) {
        return a.name?.localeCompare(b.name ?? "", "zh");
      });
    }
  });
  return segs;
};

export const getScroll = () => {
  return {
    left:
      window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
    top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
  };
};

export const setScroll = (distance = 0) => {
  document.body.scrollTop = distance;
  document.documentElement.scrollTop = distance;
};

/**
 * 一维数组转多层级的树状结构
 * @param list
 * @param key
 * @param parentKey
 */
export const buildTree = (list, key = "id", parentKey = "pid") => {
  if (_.isEmpty(list)) {
    return {
      treeData: [],
      plainTreeData: [],
    };
  }

  const treeData: Array<any> = [];
  const plainTreeData: { [key: string]: any } = {};
  const tempMap = {};

  let index = -1;

  /**
   * 存储对象
   */
  while (++index < list.length) {
    _.set(tempMap, `${list[index][key]}`, list[index]);
  }

  let jIndex = -1;

  while (++jIndex < list.length) {
    const currentItem: any = list[jIndex];

    const parentItem: any = tempMap[currentItem[parentKey]]; // 当前节点的父节点(对象)

    if (!_.has(plainTreeData[currentItem[key]], "isLeaf")) {
      _.set(currentItem, "isLeaf", true);

      plainTreeData[currentItem[key]] = { ...currentItem };
    }

    if (parentItem && currentItem[key] !== currentItem[parentKey]) {
      if (_.isEmpty(parentItem.children)) {
        parentItem.children = [];
      }

      _.set(parentItem, "isLeaf", false);

      plainTreeData[parentItem[key]] = { ...parentItem };

      parentItem.children.push(currentItem);
    } else {
      treeData.push(currentItem); // 当前节点没有父节点
    }
  }

  return {
    treeData: treeData,
    plainTreeData: _.keys(plainTreeData).map((key) => {
      return _.get(plainTreeData, key);
    }),
  };
};

export function getScrollTop() {
  let scrollTop = 0;
  let bodyScrollTop = 0;
  let documentScrollTop = 0;

  if (document.body) {
    bodyScrollTop = document.body.scrollTop;
  }

  if (document.documentElement) {
    documentScrollTop = document.documentElement.scrollTop;
  }

  scrollTop = bodyScrollTop - documentScrollTop > 0 ? bodyScrollTop : documentScrollTop;

  return scrollTop;
}

//文档的总高度
export function getScrollHeight() {
  let scrollHeight = 0;
  let bodyScrollHeight = 0;
  let documentScrollHeight = 0;

  if (document.body) {
    bodyScrollHeight = document.body.scrollHeight;
  }

  if (document.documentElement) {
    documentScrollHeight = document.documentElement.scrollHeight;
  }

  scrollHeight =
    bodyScrollHeight - documentScrollHeight > 0 ? bodyScrollHeight : documentScrollHeight;
  return scrollHeight;
}

export function getWindowHeight() {
  let windowHeight = 0;

  if (document.compatMode == "CSS1Compat") {
    windowHeight = document.documentElement.clientHeight;
  } else {
    windowHeight = document.body.clientHeight;
  }

  return windowHeight;
}

export const scrollIsFooter = (): boolean => {
  return getScrollTop() + getWindowHeight() == getScrollHeight();
};

export const getRate = (rate) => {
  if (isEmptyVal(rate)) {
    return 0;
  }

  const list = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

  const rateEx = _.round(rate / 20, 2);

  let index = -1;

  let currentRate = 0;

  while (++index < list.length) {
    const item = list[index];

    if (rateEx >= item) {
      currentRate = item;
    } else {
      break;
    }
  }

  return currentRate;
};

/*截取字符串*/
export const truncate = (str = "", width = 0, fontSize = 14, letterSpace = 0): string => {
  let length = 0;
  const reg = /[\u4e00-\u9fa5]/;
  const charWidth = (fontSize + letterSpace) / 2 + 0.5;
  const truncateList: any = [];

  for (let i = 0; i < str.length; i++) {
    const currentChar = str.charAt(i);

    if (reg.test(currentChar)) {
      length += 2;
    } else {
      length++;
    }

    if (length * charWidth < width - 3 * charWidth) {
      truncateList.push(currentChar);
    } else {
      truncateList.push("...");
      break;
    }
  }

  return truncateList.join("");
};

export const isServer = () => typeof document === "undefined";

export const isBrowser = () => !isServer();

// 参数查询设置
export const setParamsByKey = async (key, value) => {
  return localforage.setItem(key, value);
};

// 参数查询
export const getParamsByKey = async (key) => {
  return localforage.getItem(key);
};

// 参数删除
export const deleteParamsByKey = async (key) => {
  return localforage.removeItem(key);
};

// 保留?位小数
export const roundDecimal = (value, precision = 2) => {
  const roundNum = _.floor(isEmptyVal(value) ? 0 : value, precision);

  return _.isNaN(roundNum) ? value : roundNum.toFixed(precision);
};

// 根据对象转数组
export const getArrayListByObj = (obj: IObject) => {
  return _.keys(obj).map((key) => {
    const item: IObjectValBean = obj[key];

    return {
      ...item,
      ...{
        id: item.key,
        name: item.value,
      },
    };
  });
};

export interface ITableBean {
  label: string;
  value: string | number | undefined;
  order?: number;
  col: number; // 一行几列
}

// 根据col判断一行几列
export const getDetailChunkList = (list: ITableBean[] = []) => {
  const getCol = (key) => _.get(_.split(key, "-"), "[0]", "2");
  const getOrder = (key) => _.parseInt(_.get(_.split(key, "-"), "[1]", 1), 10);

  const groupByObj = _.chain(list)
    .filter((item) => !isEmptyVal(item.value))
    .map((item) => _.assign(item, { col: item.col || 2, order: item.order || 1 }))
    .groupBy((item) => `${item.col}-${item.order}`)
    .mapValues((item, key) => {
      return _.chunk(item, _.parseInt(getCol(key)));
    })
    .value();

  return _.reduce(
    _.chain(groupByObj)
      .keys()
      .orderBy((key) => {
        return getOrder(key);
      })
      .value(),
    (list: any, key) => {
      return _.concat(list, groupByObj[key]);
    },
    []
  );
};

export const getRowListCols = (cols: ITableBean[] = []) => {
  return _.reduce(
    cols,
    (res, col: ITableBean) => {
      return (res += col.col || 2);
    },
    0
  );
};

/**
 * 获取距离视窗的高度
 * @param element
 */
export function getElementViewTop(element) {
  let actualTop = element.offsetTop;
  let current = element.offsetParent;
  let elementScrollTop;
  while (current !== null) {
    actualTop += current.offsetTop;
    current = current.offsetParent;
  }
  if (document.compatMode === "BackCompat") {
    elementScrollTop = document.body.scrollTop;
  } else {
    elementScrollTop = document.documentElement.scrollTop;
  }
  return actualTop - elementScrollTop;
}

// 乘法
export const multipleNum = (value, multiple = 10000, precision = 0) => {
  return _.round(isEmptyVal(value) ? 0 : value * multiple, precision);
};

// 除法
export const divisionNum = (value, multiple = 10000, precision = 2) => {
  return _.round(isEmptyVal(value) ? 0 : value / multiple, precision);
};

export const division = (value, multiple = 10000, precision = 2) => {
  return isEmptyVal(value) ? value : _.round(value / multiple, precision);
};

export const getWindowSize = () => {
  return {
    width: document.body.offsetWidth,
    height: document.body.offsetHeight,
  };
};

export const formatAmount = (amount, unit = "万元", prefix = false) => {
  return !isEmptyVal(amount) ? `${formatCurrency(amount, 1, prefix)}${unit}` : undefined;
};

export const formatAmountFromYuan = (amount, unit = "万元", prefix = false) => {
  return !isEmptyVal(amount) ? `${formatCurrency(amount, 1 / 10000, prefix)}${unit}` : undefined;
};

export const addNumber = (...args) => {
  return _.reduce(
    args,
    (res: any, b) => {
      return (res = _.add(res, isEmptyVal(b) ? 0 : b));
    },
    0
  );
};

export const sleep = (timeoutMS) =>
  new Promise((resolve) => {
    setTimeout(resolve, timeoutMS);
  });

export const noop = () => {};

export const isImage = (fileName) => {
  return /\.(bmp|gif|jpe?g|png|svg)$/.test(fileName);
};
