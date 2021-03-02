import { AreaVo } from "api/area/src/models";
import { isEmptyVal } from ".";

export const areaTreeToCustomProps = (
  treeList: Array<AreaVo> = [],
  fieldNames = {
    label: "title",
    value: "value",
    key: "key",
    children: "children",
  },
) => {
  const { label, value, key, children } = fieldNames;

  return treeList.map((item) => {
    return {
      [label]: item.name,
      [value]: item.gbCode,
      [key]: item.gbCode,
      [children]: isEmptyVal(item.children) ? [] : areaTreeToCustomProps(item.children, fieldNames),
    };
  });
};
