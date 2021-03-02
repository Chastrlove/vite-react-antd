import * as _ from "lodash";

export type CheckedType = {
  checked: string[];
  halfChecked: string[];
};

export interface AuthFieldVo {
  /**
   * 是否可以反选，有些字段是不能再前端取消的
   * @type {boolean}
   * @memberof AuthFieldVo
   */
  canCancel?: boolean;
  /**
   * 字段代码
   * @type {string}
   * @memberof AuthFieldVo
   */
  code?: string;
  /**
   * 字段层级
   * @type {number}
   * @memberof AuthFieldVo
   */
  level?: number;
  /**
   * 字段名称
   * @type {string}
   * @memberof AuthFieldVo
   */
  name?: string;
  /**
   * 上级字段代码
   * @type {string}
   * @memberof AuthFieldVo
   */
  parentCode?: string;
  /**
   * 是否选中，表示角色是否拥有该字段权限
   * @type {boolean}
   * @memberof AuthFieldVo
   */
  selected?: boolean;
  /**
   * 字段在同一级的排序
   * @type {number}
   * @memberof AuthFieldVo
   */
  seq?: number;
  /**
   * 字段类型，1分组，2对应数据库表，3对应表字段
   * @type {number}
   * @memberof AuthFieldVo
   */
  type?: number;
}

export interface IPermissionType extends AuthFieldVo {
  title: string;
  key: string;
}

export interface IMenu extends IPermissionType {
  children: IPermissionType[];
}

export interface ITranverse {
  treeList: IMenu[];
  plainData: IPermissionType[];
}

interface TraverOption {
  idAlias?: string;
  parentIdAlias?: string;
  disableKey?: string;
  opposite?: boolean;
}
export const translatePlainToTree = (
  data,
  parentId = undefined,
  option: TraverOption = {}
): ITranverse => {
  const {
    idAlias = "code",
    parentIdAlias = "parentCode",
    disableKey = "",
    opposite = false
  } = option;
  const groupByData = _.groupBy(data, parentIdAlias);
  const plainData: Array<any> = [];
  const traverseTree = gbCode => {
    const treeList: Array<any> = [];
    const list = _.get(groupByData, gbCode) || [];
    _.forEach(list, item => {
      const children = traverseTree(item[idAlias]);

      if (children && children.length === 0) {
        treeList.push({
          ...item,
          title: item.name,
          key: item[idAlias],
          disabled:
            _.isBoolean(item[disableKey]) && opposite ? !item[disableKey] : item[disableKey],
          isLeaf: true
        });
        plainData.push({
          ...item,
          title: item.name,
          key: item[idAlias],
          isLeaf: true
        });
      } else {
        treeList.push({
          ...item,
          title: item.name,
          key: item[idAlias],
          disabled:
            _.isBoolean(item[disableKey]) && opposite ? !item[disableKey] : item[disableKey],
          children,
          isLeaf: false
        });
        plainData.push({
          ...item,
          title: item.name,
          key: item[idAlias],
          isLeaf: false,
          children: []
        });
      }
    });
    return treeList;
  };

  const treeList = traverseTree(parentId);
  return {
    treeList,
    plainData: plainData
  };
};

export function translatePlainToTreeOld(
  data,
  parentId = null,
  option = {
    idAlias: "code",
    parentIdAlias: "parentCode"
  }
): ITranverse {
  const { idAlias, parentIdAlias } = option;
  const traverseTree = (plainData, parentId) => {
    const treeList: any = [];
    let temp = [];
    let index = -1;
    let length = plainData.length || 0;

    while (++index < length) {
      const item: IMenu = plainData[index];

      if (item[parentIdAlias] === parentId) {
        temp = traverseTree(plainData, item[idAlias]);

        if (temp && temp.length > 0) {
          treeList.push(
            _.assign({}, item, {
              children: temp
            })
          );
        } else {
          treeList.push(item);
        }
      }
    }

    return treeList;
  };

  const treeList = traverseTree(data, parentId);

  return {
    treeList,
    plainData: data
  };
}

export const findCheckHalfKeys = (keys, data) => {
  //针对于antd的tree 如果父节点被勾上，子节点会被全部勾上，做的特殊处理。非严格模式(用于菜单权限)
  //需求是即使父节点存在于selectedKey里面，还是要根据子节点的勾选情况来区分checked和halfChecked
  //如果父节点没被勾上，子节点却存在，则认为是脏数据
  const checkedKeys: CheckedType = {
    checked: [],
    halfChecked: []
  };

  function traverseNode(nodes) {
    const checked: Array<string> = [];
    const halfChecked: Array<string> = [];
    _.each(nodes, node => {
      if (_.indexOf(keys, node.key) > -1) {
        if (_.isEmpty(node.children)) {
          checked.push(node.key);
        } else {
          const childrenChecked = traverseNode(node.children);
          if (childrenChecked.checked.length > 0) {
            if (childrenChecked.checked.length === node.children.length) {
              checked.push(node.key);
            }
            if (childrenChecked.checked.length < node.children.length) {
              halfChecked.push(node.key);
            }
          }
        }
      }
    });
    checkedKeys.checked = _.concat(checkedKeys.checked, checked);
    checkedKeys.halfChecked = _.concat(checkedKeys.halfChecked, halfChecked);
    return {
      checked,
      halfChecked
    };
  }

  traverseNode(data);
  return checkedKeys;
};

export const findCheckHalfKeysStrict = (keys, data) => {
  //严格模式,子节点被全部勾选，父节点一定存在。子节点有没被勾选的，父节点key不存在
  const checkedKeys: CheckedType = {
    checked: [],
    halfChecked: []
  };

  function traverseNode(nodes) {
    const checked: Array<string> = [];
    const halfChecked: Array<string> = [];
    _.each(nodes, node => {
      if (_.indexOf(keys, node.key) > -1) {
        //节点被勾选
        if (_.isEmpty(node.children)) {
          checked.push(node.key);
        } else {
          const childrenChecked = traverseNode(node.children);
          if (childrenChecked.checked.length > 0) {
            if (childrenChecked.checked.length === node.children.length) {
              checked.push(node.key);
            }
            if (childrenChecked.checked.length < node.children.length) {
              halfChecked.push(node.key);
            }
          } else {
            console.warn("父节点被勾上，子节点没被勾选", node);
          }
        }
      } else {
        if (!_.isEmpty(node.children)) {
          const childrenChecked = traverseNode(node.children);
          if (childrenChecked.checked.length > 0) {
            if (childrenChecked.checked.length === node.children.length) {
              console.warn("子节点全部被勾上，父节点没被勾选", node);
              checked.push(node.key);
            }
            if (childrenChecked.checked.length < node.children.length) {
              halfChecked.push(node.key);
            }
          }
        }
      }
    });
    checkedKeys.checked = _.concat(checkedKeys.checked, checked);
    checkedKeys.halfChecked = _.concat(checkedKeys.halfChecked, halfChecked);
    return {
      checked,
      halfChecked
    };
  }

  traverseNode(data);
  return checkedKeys;
};

export const defaultFilterMenuData = (menuData: Array<any> = []): Array<any> =>
  menuData
    .filter(item => item && item.name && !item.hideInMenu)
    .map(item => {
      if (
        item.children &&
        Array.isArray(item.children) &&
        !item.hideChildrenInMenu &&
        item.children.some(child => child && !!child.name)
      ) {
        const children = defaultFilterMenuData(item.children);
        if (children.length) return { ...item, children };
      }
      return { ...item, children: undefined };
    })
    .filter(item => item);
