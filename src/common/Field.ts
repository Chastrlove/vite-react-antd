import { FieldState, Validator } from "formstate";
import { action, computed, observable, transaction, set, makeObservable } from "mobx";
import * as _ from "lodash";
import { AntTreeNodeProps } from "antd/lib/tree";
import ReactDOM from "react-dom";
import { ReactInstance } from "react";

export interface IOption<T=any> {
  id: any;
  name: T;

  [key: string]: any;
}

export interface ITreeNode extends AntTreeNodeProps {
  children?: ITreeNode[];
}

export interface IFieldExtra {
  hasFeedback?: boolean;
  required?: boolean;
  wrapperCol?: any;
  disabled?: boolean;
  option?: IOption[];
  disabledOption?: Array<any>;
  treeData?: ITreeNode[];
  visible?: boolean;
  autoValidation?: boolean;
}

export interface IFieldOption<T> extends IFieldExtra {
  value: T;
}

export interface IFieldOptionWithRules<T> extends IFieldOption<T> {
  rules?: Validator<T>[];
}

export class Field<T> extends FieldState<T> {
  private static getInitExtra(): IFieldExtra {
    return {
      hasFeedback: false,
      autoValidation: true,
      required: false,
      disabled: false,
      visible: true,
      option: [],
      disabledOption: [],
    };
  }

  //dom实例
  private reactInstance: ReactInstance;

  public setReactInstance = (reactInstance) => {
    if (reactInstance) {
      this.reactInstance = reactInstance;
    }
  };

  private domInstance: Element | null | Text;

  public getDomInstance = () => {
    if (!this.domInstance) {
      this.domInstance = ReactDOM.findDOMNode(this.reactInstance);
    }
    return this.domInstance;
  };

  public extra: IFieldExtra = Field.getInitExtra();

  constructor(option: IFieldOptionWithRules<T>) {
    super(option.value);

    makeObservable(this, {
      extra: observable,
      validateStatus: computed,
      changeExtra: action
    });

    this.changeExtra(option);
    if (option.autoValidation === false) {
      this.setAutoValidationDefault(option.autoValidation);
    }
  }

  public get validateStatus(): any {
    if (!this.hasBeenValidated) {
      return "";
    }
    return _.isEmpty(this.error) ? "success" : "error";
  }

  public changeExtra = (value: IFieldExtra) => {
    set(this.extra, value);
    return this.extra;
  };

  public changeRules = (rules: Validator<T>[]) => {
    if (rules && rules.length > 0) {
      return this.validators(...rules);
    }
  };

  public init = () => {
    transaction(() => {
      this.reset();
      this.extra = Field.getInitExtra();
    });
  };
}
