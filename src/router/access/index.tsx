import React, { FC, ReactElement } from "react";

interface AccessProps {
  accessible: boolean;
  fallback: ReactElement;
  children: ReactElement;
}

export const Access: FC<AccessProps> = (props) => {
  return props.accessible ? props.children : props.fallback;
};
