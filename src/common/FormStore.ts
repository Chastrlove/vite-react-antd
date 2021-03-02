import * as _ from "lodash";
import { FormState, ValidatableMapOrArray } from "formstate";
import { action, makeObservable, toJS, transaction } from "mobx";

import { Field } from "./Field";
import { IFieldOptionWithRules } from "./Field";
import { scrollToView } from "./ScrollToView";
import { ComposibleValidatable } from "formstate/src/core/types";

export type IFormField<T> = {
  [P in keyof T]: IFieldOptionWithRules<T[P]>;
};

export type IForm<T> = {
  [P in keyof T]: Field<T[P]>;
};

type FieldTValue = { [key: string]: ComposibleValidatable<any> };

export type FormType<T> = FormStore<IForm<T>>;

export type MapFieldValue<T extends FieldTValue> = {
  [P in keyof T]: T[P]["$"];
};

export class FormStore<TValue extends ValidatableMapOrArray> extends FormState<TValue> {
  private formId?: string;

  public get initId() {
    if (this.formId) {
      return this.formId;
    }
    return (this.formId = _.uniqueId("formId_"));
  }

  public init = () => {
    const $ = this.$;
    transaction(() => {
      if (_.isArrayLikeObject($)) {
        for (const value of $ as any) {
          if (value instanceof Field) {
            value.reset();
          } else if (value instanceof FormStore) {
            value.init();
          }
        }
      } else {
        for (const key in $) {
          if ($.hasOwnProperty(key)) {
            const value = $[key];
            if (value instanceof Field) {
              value.reset();
            } else if (value instanceof FormStore) {
              value.init();
            }
          }
        }
      }
    });
  };

  constructor(public $: TValue) {
    super($);
    makeObservable(this, {
      setValues: action,
      onChangeValues: action,
    });
  }

  public setValues = (values, dirty = false) => {
    if (_.isEmpty(values) === false) {
      const $ = this.$;
      transaction(() => {
        for (const key in values) {
          if ($.hasOwnProperty(key)) {
            $[key].$ = values[key];
            $[key].value = values[key];
            $[key].dirty = dirty;
          }
        }
      });
    }

    return this;
  };

  public onChangeValues = (values) => {
    if (_.isEmpty(values) === false) {
      const $ = this.$;
      transaction(() => {
        for (const key in values) {
          if ($.hasOwnProperty(key)) {
            $[key].onChange(values[key]);
          }
        }
      });
    }

    return this;
  };


  public getFormValues = <T =any  /*MapFieldValue<Extract<TValue, FieldTValue>>*/>() => {
    return _.mapValues(this.$, (item: any) => {
      return toJS(item.value);
    }) as T;
  };

  public scrollToErrorView = () => {
    const errorFields = _.filter(toJS(this.$), (item: any) => {
      return !_.isEmpty(item.error);
    });

    const errorFieldsSorted = _.sortBy(errorFields, (fieldState: any) => {
      return fieldState.getDomInstance().getBoundingClientRect().top;
    }) as Array<any>;

    const firstNode = errorFieldsSorted[0].getDomInstance();

    if (firstNode) {
      scrollToView(firstNode);
    }
  };

  public validatorIsDirty = <T = any>(): T => {
    return _.some(this.$, (item: any) => {
      return toJS(item.dirty);
    }) as any;
  };
}
