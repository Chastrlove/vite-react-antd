import Icon from "@ant-design/icons";
import React, { lazy } from "react";
import { RoutesTypes } from "./types";
import { AccountBookOutlined } from "@ant-design/icons";

import Layout from "layouts/index";

export const layoutRoute: RoutesTypes = {
  path: "/",
  component: Layout,
  lazy: false,
  routes: [
    {
      path: "/",
      exact: true,
      redirect: "/home",
    },
    {
      path: "/home",
      name: "首页",
      hideInMenu: true,
      component: lazy(() => import("../pages/home")),
    },
    {
      path: "/list",
      name: "普通表格",
      icon: <AccountBookOutlined />,
      routes: [
        {
          path: "/list/one",
          name: "列表1",
          icon: <AccountBookOutlined />,
          exact: true,
          access: "listOne",
          component: lazy(() => import("../pages/list")),
        },
        {
          path: "/list/two",
          name: "列表2",
          icon: <AccountBookOutlined />,
          exact: true,
          component: lazy(() => import("../pages/list")),
        },
        {
          path: "/list/detail",
          name: "详情",
          hideInMenu: true,
          exact: true,
          component: lazy(() => import("../pages/list/Detail")),
        },
      ],
    },

    {
      path: "/403",
      hideInMenu: true,
      exact: true,
      component: lazy(() => import("../pages/error/403")),
      name: "403",
    },
    {
      path: "/404",
      hideInMenu: true,
      exact: true,
      component: lazy(() => import("../pages/error/404")),
      name: "404",
    },
  ],
};

const loginRoute: RoutesTypes = {
  path: "/login",
  component: lazy(() => import("../pages/login")),
};

const config = [
  {
    path: "/",
    routes: [loginRoute, layoutRoute],
  },
];

export default config;
