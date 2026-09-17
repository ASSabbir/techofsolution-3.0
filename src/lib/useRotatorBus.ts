"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export type RotatorBus = {
  /** Register a callback that fires the instant the shared index advances.
   *  Returns an unsubscribe function for cleanup. */
  subscribe: (cb: (index: number) => void) => () => void;
};

type Timing = {
  /** Seconds each item stays fully visible before transitioning. */
  hold: number;
};

/**
 * Owns exactly one GSAP timeline. Every subscriber's tween is kicked off
 * from inside the same synchronous callback, so — because JS is single
 * threaded — they all start on the same animation frame. This is what
 * keeps the word and the image "physically connected" instead of merely
 * running two timers with matching durations.
 */
export function useRotatorBus(length: number, timing: Timing, reduced: boolean): RotatorBus {
  const listeners = useRef(new Set<(index: number) => void>());
  const indexRef = useRef(0);

  useEffect(() => {
    if (reduced || length <= 1) return;

    const tl = gsap.timeline({ repeat: -1 });
    tl.to({}, { duration: timing.hold }).add(() => {
      indexRef.current = (indexRef.current + 1) % length;
      listeners.current.forEach((cb) => cb(indexRef.current));
    });

    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, timing.hold, reduced]);

  return {
    subscribe: (cb) => {
      listeners.current.add(cb);
      return () => {
        listeners.current.delete(cb);
      };
    },
  };
}