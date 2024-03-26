/* eslint-disable react-hooks/exhaustive-deps */
import { EffectCallback, useEffect, useRef } from "react";

export const useEffectOnce = (effect: EffectCallback) => {
  const destroyFunc = useRef<ReturnType<EffectCallback> | undefined>();
  const calledOnce = useRef(false);
  const renderAfterCalled = useRef(false);

  if (calledOnce.current) {
    renderAfterCalled.current = true;
  }

  useEffect(() => {
    if (calledOnce.current) {
      return;
    }

    calledOnce.current = true;
    destroyFunc.current = effect();

    return () => {
      if (!renderAfterCalled.current) {
        return;
      }

      if (destroyFunc.current) {
        destroyFunc.current();
      }
    };
  }, []);
};
