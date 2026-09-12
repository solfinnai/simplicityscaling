"use client";

import type { ComponentProps } from "react";

import { track } from "@/lib/analytics";

export function CtaLink({
  eventLabel,
  ...props
}: ComponentProps<"a"> & { eventLabel: string }) {
  return (
    <a
      {...props}
      onClick={(event) => {
        track("cta_click", { label: eventLabel });
        props.onClick?.(event);
      }}
    />
  );
}
