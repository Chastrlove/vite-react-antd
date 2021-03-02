import { DropDownProps } from "antd/es/dropdown";
import { Dropdown } from "antd";
import React from "react";
import classNames from "classnames";

declare type OverlayFunc = () => React.ReactNode;

export interface HeaderDropdownProps extends Omit<DropDownProps,'overlay'> {
  overlayClassName?: string;
  overlay: React.ReactNode | OverlayFunc;
  placement?:
    | "bottomLeft"
    | "bottomRight"
    | "topLeft"
    | "topCenter"
    | "topRight"
    | "bottomCenter";
}

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({
  overlayClassName: cls,
  ...restProps
}) => (
  <Dropdown
    overlayClassName={classNames(cls)}
    {...restProps}
  />
);

export default HeaderDropdown;
