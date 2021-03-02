import md5 from "md5";

export const encrypt = value => {
  return md5(value);
};
