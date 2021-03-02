import { useRouter } from "next/router";

export const useCustomRouter = () => {
  const router = useRouter();

  const gotoOtherPath = (path) => {
    return router.push(path);
  };

  return [gotoOtherPath];
};
