import * as React from "react";
import { useRef } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import ProLayout, { MenuDataItem } from "@ant-design/pro-layout";
import { RightContent } from "./header/RightContent";
import { Route } from "@ant-design/pro-layout/lib/typings";

import style from "./LayoutStyle.module.less";

interface BasicLayoutViewProps extends RouteComponentProps {
  route: Route;
  children: React.ReactNode;
}

export const BasicLayoutView = (props: BasicLayoutViewProps) => {
  console.log(props);
  const menuDataRef = useRef<MenuDataItem[]>([]);

  const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
    menuList.map((item) => {
      const localItem = {
        ...item,
        children: item.children ? menuDataRender(item.children) : [],
      };
      return localItem;
    });

  return (
    <ProLayout
      postMenuData={(menuData) => {
        menuDataRef.current = menuData || [];
        return menuData || [];
      }}
      className={style.layout}
      navTheme={"dark"}
      fixSiderbar={true}
      breadcrumbRender={(routers = []) => {
        return [...routers];
      }}
      menuProps={{
        className: style.menu,
      }}
      itemRender={(route, params, routes, paths, ...props) => {
        const last = routes.indexOf(route) === routes.length - 1;
        return last ? (
          <span>{route.breadcrumbName}</span>
        ) : (
          <Link to={route.path}>{route.breadcrumbName}</Link>
        );
      }}
      rightContentRender={(rightProps) => (
        <RightContent {...{ ...rightProps }} />
      )}
      menuItemRender={(menuItemProps, defaultDom) =>
        menuItemProps.isUrl || menuItemProps.children ? (
          defaultDom
        ) : (
          <Link to={menuItemProps.path!}>{defaultDom}</Link>
        )
      }
      disableMobile={true}
      // collapsedButtonRender={false}
      menuDataRender={menuDataRender}
      footerRender={() => null}
      route={props.route}
    >
      {props.children}
    </ProLayout>
  );
};
