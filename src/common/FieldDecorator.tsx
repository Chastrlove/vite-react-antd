import * as React from "react";
import { ComponentClass, forwardRef, ForwardRefRenderFunction, FunctionComponent } from "react";
import { Form } from "antd";
import { Field, IFieldExtra } from "./Field";
import { FormItemProps as RawFormItemProps } from "antd/es/form/FormItem";
import _ from "lodash";
import classNames from "classnames";
import { observer } from "mobx-react";

export const defaultFormItemProps: Omit<RawFormItemProps, "children"> = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

type ComponentType<P> = ComponentClass<P> | FunctionComponent<P>;

interface FormItemProps extends Partial<RawFormItemProps> {
  noMarginBtm?: boolean;
}

export type FieldProps<T, U> = { field?: Field<U>; form?: FormItemProps; input?: T };

export interface IFormItemOptions {
  forwardRef?: boolean;
  form?: {
    valuePropName?: string;
  };
  allowExtraKeys?: Array<string> | false;
  getPopupContainer?: boolean;
}

const isFunctionCmp = (component): component is FunctionComponent<any> => {
  return (
    typeof component === "function" &&
    (!component.prototype || !component.prototype.render) &&
    !component["isReactClass"] &&
    !Object.prototype.isPrototypeOf.call(React.Component, component)
  );
};

export const withFormItem = <T extends object, U = any>(
  baseComponent: ComponentType<T & IFieldExtra>,
  options?: IFormItemOptions,
): React.MemoExoticComponent<
  React.ForwardRefExoticComponent<FieldProps<T, U> & React.RefAttributes<unknown>>
> => {
  const baseComponentName = baseComponent.displayName || baseComponent.name;

  const realOptions: IFormItemOptions = {
    forwardRef: true,
    getPopupContainer: false,
    ...options,
  };

  let TargetComponent;

  if (isFunctionCmp(baseComponent) && realOptions.forwardRef) {
    TargetComponent = forwardRef(baseComponent as ForwardRefRenderFunction<any>);
  } else {
    TargetComponent = baseComponent;
  }

  const wrappedComponent: React.ForwardRefRenderFunction<unknown, FieldProps<T, U>> = <
    P extends object
  >(
    props,
    ref,
  ) => {
    let { form, input, field } = props;

    input = {
      ...input,
      placeholder: input?.["placeholder"] ?? `请输入${form?.label || ""}`,
    } as T;

    const { value, onChange, extra, validateStatus, error } =
      field || new Field({ value: undefined });

    const handleOnChange = (value, ...restProps) => {
      onChange(value);
      (input as any)?.onChange?.(value, ...restProps);
    };

    const { hasFeedback, required, ...extraProps } = extra;

    const getPopupContainer = (triggerNode) => triggerNode.parentNode;

    return (
      <Form.Item
        {...{
          ...defaultFormItemProps,
          ...options?.form,
          ...form,
          className: classNames(
            form?.className,
          ),
          ...{
            hasFeedback,
            required,
            validateStatus,
            help: error || form?.help,
          },
        }}
      >
        <TargetComponent
          value={value}
          onChange={handleOnChange}
          {...(_.omit(
            {
              ...input,
              ...(realOptions.allowExtraKeys && realOptions.allowExtraKeys.length === 0
                ? extraProps
                : _.pick(extraProps, realOptions.allowExtraKeys || [])),
              getPopupContainer,
              ref,
            },
            [
              !realOptions.getPopupContainer && "getPopupContainer",
              !realOptions.forwardRef && "ref",
            ].filter(Boolean) as string[],
          ) as T)}
        />
      </Form.Item>
    );
  };

  wrappedComponent.displayName = baseComponentName;

  let memoComponent;

  if (realOptions.forwardRef) {
    memoComponent = observer(forwardRef(wrappedComponent));
  } else {
    memoComponent = observer(wrappedComponent);
  }

  memoComponent.displayName = baseComponentName;

  return memoComponent;
};

export const PlainFormItem = (props: FormItemProps) => {
  return (
    <Form.Item {...defaultFormItemProps} {...props}>
      {props.children}
    </Form.Item>
  );
};
