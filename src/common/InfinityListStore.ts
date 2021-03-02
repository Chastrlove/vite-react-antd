import { action, computed, observable, makeObservable } from "mobx";
import * as _ from "lodash";
import { BaseResponse } from "common/requestWrap";

export const DEFAULTPAGESIZE = 2;

export class InfinityListStore<T> {
  public listLoader;
  public resultPagination = {
    pageSize: DEFAULTPAGESIZE,
    currentPage: 1,
    totalPage: 0,
    totalCount: 0
  };
  public currentPage = 1;

  public pageSize = DEFAULTPAGESIZE;
  public loading = false;

  constructor(loader) {
    makeObservable(this, {
      resultPagination: observable,
      currentPage: observable,
      loading: observable,
      pagination: computed,
      hasMore: computed,
      setPagination: action,
      toggleLoading: action,
      loadMore: action
    });

    this.listLoader = loader;
  }

  public get pagination() {
    return {
      "X-Page-Size": this.pageSize,
      "X-Current-Page": this.currentPage
    };
  }

  public get hasMore() {
    const { currentPage, pageSize, totalCount } = this.resultPagination;
    return currentPage * pageSize < totalCount;
  }

  public setPagination = (response: BaseResponse) => {
    this.resultPagination = _.pick(response, Object.keys(this.resultPagination)) as any;
  };

  public toggleLoading = (loading = !this.loading) => {
    this.loading = loading;
  };

  public loadMore = async (form, option = { init: false }) => {
    if (!option.init) {
      this.currentPage = this.currentPage + 1;
    } else {
      this.currentPage = 1;
    }

    this.toggleLoading();
    try {
      const res: BaseResponse<T> = await this.listLoader(form, {
        headers: {
          ...this.pagination
        }
      });
      if (res.success) {
        this.setPagination(res);
        return Promise.resolve(res);
      } else {
        return Promise.reject(res.result["errorMessage"]);
      }
    } catch (e) {
      return Promise.reject(e.message);
    } finally {
      this.toggleLoading();
    }
  };
}
