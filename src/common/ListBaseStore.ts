import { action, observable, runInAction, set, makeObservable } from "mobx";
import { cloneDeep, isEmpty } from "lodash";
import { PaginationProps } from "antd/lib/pagination";
import Pagination from "rc-pagination/lib/locale/zh_CN";
import { BaseResponse } from "common/requestWrap";

export const PAGESIZE = 20;

export class ListBaseStore<T> {
  public spiLoading: boolean = false; // 页面加载loading

  public refreshLoading: boolean = false; // 刷新按钮loading

  public data: T[] = [];

  public selectedRows: T[] = [];

  private defaultPagination: PaginationProps = {
    defaultCurrent: 1,
    showSizeChanger: false,
    current: 1,
    pageSize: PAGESIZE,
    total: 0,
    showQuickJumper: false,
    // showTotal: total => {
    //   const { current } = this.pagination;
    //
    //   return `第${current}/${Math.ceil(total / PAGESIZE)}页, 共 ${total} 条`;
    // },
    locale: Pagination
  };

  public pagination: PaginationProps = cloneDeep(this.defaultPagination);

  public changeData = (data: T[] = []) => {
    return (this.data = observable(data));
  };

  public _toggleSpiLoading = (spiLoading = !this.spiLoading) => (this.spiLoading = spiLoading);

  public _toggleRefreshLoading = (refreshLoading = !this.refreshLoading) =>
    (this.refreshLoading = refreshLoading);

  public changePagination = (value: PaginationProps) => {
    set(this.pagination, value);
    return this.pagination;
  };

  public clearPagination = () => {
    return this.changePagination(cloneDeep(this.defaultPagination));
  };

  public searchCallback = (result: any, total, toggle = true) => {
    this.changePagination({ total });
    this.changeData(result);
    if (toggle) {
      this._toggleSpiLoading(false);
      this._toggleRefreshLoading(false);
    }
    return result;
  };

  public changeState = (params) => {
    this.refreshLoading = params;
  };

  public setSelectedRows = (selectedRows) => {
    this.selectedRows = selectedRows;
  };

  public setFilterColor = (filterColor, values) => {
    if (!isEmpty(values)) {
      runInAction(() => {
        for (const key in values) {
          if (filterColor.hasOwnProperty(key)) {
            filterColor[key] = values[key];
          }
        }
      });
    }
  };
  public setFilterVisible = (filterVisible, values) => {
    if (!isEmpty(values)) {
      runInAction(() => {
        for (const key in values) {
          if (filterVisible.hasOwnProperty(key)) {
            filterVisible[key] = values[key];
          }
        }
      });
    }
  };

  public setRefreshLoading = (value = true) => {
    this._toggleSpiLoading(value);
    this._toggleRefreshLoading(value);
  };

  public setResponseData = async (loader: (...args) => Promise<BaseResponse<T[]>>, toggle = true) => {
    this.setRefreshLoading(true);

    const res = await loader();

    if (res.success) {
      this.searchCallback(res.result || [], res.totalCount || 0, toggle);
    }
  };

  public resetList = () => {
    this.clearPagination();
    this.changeData();
    this.setRefreshLoading(false);
  };

  constructor() {
    makeObservable(this, {
      spiLoading: observable,
      refreshLoading: observable,
      data: observable,
      selectedRows: observable,
      pagination: observable,
      changeData: action,
      _toggleSpiLoading: action,
      changePagination: action,
      searchCallback: action,
      changeState: action,
      setSelectedRows: action,
      setFilterColor: action,
      setFilterVisible: action,
      setRefreshLoading: action,
      resetList: action
    });
  }
}
