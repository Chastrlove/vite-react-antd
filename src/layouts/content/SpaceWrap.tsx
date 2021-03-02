import { Space as AntdSpace } from "antd";
import * as React from "react";
import style from "./SpaceStyle.module.less";
import classNames from "classnames";
import { SpaceProps } from "antd/lib/space";

export const Space: React.FC<SpaceProps> = (props) => {
  return (
    <AntdSpace
      className={classNames(style.space, props.className)}
      direction={"vertical"}
      size={"middle"}
      {...props}
    />
  );
};
