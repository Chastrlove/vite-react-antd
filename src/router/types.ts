import { Route } from "@ant-design/pro-layout/lib/typings";

export interface RoutesTypes extends Route {
  component?: any;
  routes?: Array<RoutesTypes>;
  access?: string;
  unaccessible?: boolean;
}
