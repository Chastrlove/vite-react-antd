import React, { createElement } from "react";
import classNames from "classnames";
import { Button } from "antd";
import config from "./typeConfig";
import styles from "./index.module.less";

import * as H from "history";
import { Link } from "react-router-dom";

export interface ExceptionProps<
  L = {
    to: H.LocationDescriptor;
    href?: H.LocationDescriptor;
    replace?: boolean;
    innerRef?: (node: HTMLAnchorElement | null) => void;
  }
> {
  type: "403" | "404" | "500";
  title?: React.ReactNode;
  desc?: React.ReactNode;
  img?: string;
  actions?: React.ReactNode;
  linkElement?: string | React.ComponentType<L>;
  style?: React.CSSProperties;
  className?: string;
  backText?: React.ReactNode;
  redirect?: string;
}

class Exception extends React.PureComponent<ExceptionProps> {
  static defaultProps = {
    backText: "返回首页",
    redirect: "/",
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      className,
      backText,
      linkElement = Link,
      type,
      title,
      desc,
      img,
      actions,
      redirect,
      ...rest
    } = this.props;
    const pageType = type in config ? type : "404";
    const clsString = classNames(styles.exception, className);
    return (
      <div className={clsString} {...rest}>
        <div className={styles.imgBlock}>
          <div
            className={styles.imgEle}
            style={{ backgroundImage: `url(${img || config[pageType].img})` }}
          />
        </div>
        <div className={styles.content}>
          <h1>{title || config[pageType].title}</h1>
          <div className={styles.desc}>{desc || config[pageType].desc}</div>
          <div className={styles.actions}>
            {actions ||
              createElement(
                linkElement,
                {
                  to: redirect,
                  href: redirect,
                },
                <Button type="primary">{backText}</Button>
              )}
          </div>
        </div>
      </div>
    );
  }
}

export default Exception;
