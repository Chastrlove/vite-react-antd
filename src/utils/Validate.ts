import { toJS } from "mobx";
import { isEmptyVal } from "./index";

export function isRequired(value) {
  return isEmptyVal(toJS(value)) ? "必填" : "";
}
