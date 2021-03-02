import React, { createContext, useContext, useState } from "react";
import { usePromise } from "hooks/usePromise";

export type InitStateType = {
  initialState?: Record<any, any>;
  loading: boolean;
  error?: Error;
};

export const InitStateModelKey = "@@initialState";

export type UserDto = {
  userName: string;
  permissions: Array<{
    code: string;
  }>;
};

async function getInitialState() {
  // return await getUserInfo();
  return {
    userName: "chastlove",
    permissions: [{ path: "/list/one", code: "listOne1" }],
  };
}

export const useInit = () => {
  const { request, error, data, isLoading, setData } = usePromise(
    getInitialState,
    true
  );
  return {
    initialState: data,
    setInitState: setData,
    loading: isLoading,
    error: error,
    refresh: request,
  };
};
