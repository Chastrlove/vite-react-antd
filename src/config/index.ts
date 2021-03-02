// import fetchPolyfill from "isomorphic-unfetch";
import { isServer } from "utils/index";
import { getAuth } from "config/AuthOperation";
import _ from "lodash";

interface IConfig {
  host: string;
  port: number;
  api: string;
  gatewayApi: string;
}

const outCfg: IConfig | any = {
  host: "//localhost",
  port: 3000,
  get api() {
    return `/api`;
  },
};

const config = {
  basePath: outCfg.api,
  // fetchApi: fetchPolyfill,
  accessToken: (value?) => {
    if (isServer()) {
      return;
    }
    return getAuth() as any;
  },
};

export const envConfig = {
  development: outCfg,
  test: {
    host: "10.64.200.202",
    port: 8000,
    get api() {
      return `/api`;
    },
  },
  production: {
    host: "10.64.200.202",
    port: 80,
    gatewayApi: "http://www.taotezi.com/",
    get api() {
      return `/api`;
    },
  },
};

export const getGatewayApiByEnv = () => {
  const gatewayEnvConfig = {
    dev: {
      gatewayApi: "//10.64.200.201:8088",
    },
    test: {
      gatewayApi: "//10.64.200.201:8088",
    },
    pro: {
      gatewayApi: "//www.taotezi.com",
    },
  };

  const env: any = process.env.CUSTOM_ENV;

  return _.get(gatewayEnvConfig, `${env}.gatewayApi`, gatewayEnvConfig.pro.gatewayApi);
};

export default config;
