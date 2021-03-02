import { action, observable, runInAction, makeObservable } from "mobx";
import { BaseResponse } from "common/requestWrap";

interface IState<T> {
  data: T[];
  loading: boolean;
  total: number;
}

const defaultState: IState<any> = {
  data: [],
  loading: true,
  total: 0
};

export class ListNoPageStore<T> {
  public constructor(defaultProps: Partial<IState<T>> = {}) {
    makeObservable(this, {
      state: observable,
      setState: action
    });

    this.defaultState = { ...defaultState, ...defaultProps };
    this.setState(defaultProps);
  }

  public defaultState = { ...defaultState };

  public state: IState<T> = { ...defaultState };

  public setState = (state: Partial<IState<T>> = { ...this.defaultState }) => {
    Object.keys(state).forEach((key) => {
      this.state[key] = state[key];
    });
  };

  public createRequest = async (loader: (...args) => Promise<BaseResponse<T[]>>, formatResult?: (result: T[]) => T[]) => {
    this.setState({ loading: true });

    try {
      const res = await loader();

      runInAction(() => {
        const result = typeof formatResult === "function" ? formatResult(res.result) : res.result;

        this.setState({ data: result, total: result.length });
      });
    } catch (e) {
      return Promise.reject(e);
    } finally {
      this.setState({ loading: false });
    }
  };
}
