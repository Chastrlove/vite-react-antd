import * as React from "react";
import style from "./SuspenseFallback.module.less";

export const SuspenseFallback = () => {
  return (
    <>
      <div className={style.spinContainer}>
        <div className={style.spinner}>
          <div />
          <div className={style.rect2} />
          <div className={style.rect3} />
          <div className={style.rect4} />
          <div className={style.rect5} />
        </div>
      </div>
    </>
  );
};
