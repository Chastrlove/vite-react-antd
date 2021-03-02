import _ from "lodash";
import { UserDto } from "../../model/InitStateStore";

export const accessFactory = (initialState?: UserDto) => {
  const { permissions } = initialState || {};
  return _.reduce(
    permissions,
    function (result, permission, key) {
      const code = permission.code; /*&& permission.owned === true*/
      result[code] = true;
      return result;
    },
    {}
  );
};
