import devWarning, { resetWarned } from "rc-util/lib/warning";

const devWarningWrap = (valid: boolean, component: string, message: string): void => {
  devWarning(valid, `[antd: ${component}] ${message}`);
};

export default devWarningWrap;

export { resetWarned };
