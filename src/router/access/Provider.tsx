import { AccessContext } from "./Context";
import React, { cloneElement, useMemo } from "react";
import { useModel } from "../../model/GlobalProvider";
import { InitStateModelKey } from "../../model/InitStateStore";

import { accessFactory } from "./AccessLogic";
import { traverseModifyRoutes } from "./utils";

export const AccessProvider = (props) => {
  const { children } = props;
  const { initialState } = useModel(InitStateModelKey);

  const access = useMemo(() => {
    return accessFactory(initialState);
  }, [initialState]);

  return (
    <AccessContext.Provider value={access}>
      {cloneElement(children, {
        ...children.props,
        routes: traverseModifyRoutes(props.routes, access),
      })}
    </AccessContext.Provider>
  );
};
