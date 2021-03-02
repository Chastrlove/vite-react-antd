import * as _ from "lodash";
import {INav} from "component/header/Type";

const getPathName = (pathName = "") => {
  return _.get(_.split(pathName, "?"), "[0]");
};

export class LocationModuleStore {
  public currentLocation = {
    pathname: typeof document !== "undefined" ? getPathName(window.location.pathname) : ""
  };

  public moduleStore = new Map();

  public setLocation = currentLocation => {
    this.currentLocation = currentLocation;
  };

  public getModuleStore = pathName => {
    const store = this.moduleStore.get(pathName);
    this.moduleStore.delete(pathName);
    return store;
  };

  // 删除相关的全局缓存的store
  public deleteRelateByPath = (navItem: INav) => {
    const pathName = navItem.path;

    if (navItem.isNeedDeleteStore === true) {
      const keys = Array.from(this.moduleStore.keys());

      _.forEach(keys, (key) => {
        if (_.includes(key, pathName)) {
          this.moduleStore.delete(key);
        }
      });
    }
  };

  public setModuleStore = store => {
    this.moduleStore.set(this.currentLocation.pathname, store);
  };

  public clearOutdatedModule = () => {
    this.moduleStore.delete(this.currentLocation.pathname);
  };

  public registerLocationModule = url => {
    const pathName = getPathName(url);

    //记住上一次的location
    const {pathname: lastPathName} = this.currentLocation;

    //非父子关系跳转，清除store
    if (!_.includes(pathName, lastPathName)) {
      this.clearOutdatedModule();
    }

    this.setLocation({pathname: pathName});
  };
}
