import { LoaderComponent } from "next/dist/next-server/lib/dynamic";
import dynamic from "next/dynamic";
import { SuspenseFallback } from "component/suspenseFallback";
import React from "react";

export const getDynamicComp = (asyncImport: () => LoaderComponent<{}>) => {
  return dynamic(asyncImport, {
    ssr: false,
    loading: () => <SuspenseFallback />,
  });
};
