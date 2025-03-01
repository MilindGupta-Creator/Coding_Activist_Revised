"use client";
import React, { useState } from "react";
import {cn} from "../../lib/utils";
import { ArrowRight } from "lucide-react";

export const ButtonHoverEffect = ({
  children,
  className,
  containerClassName,
  as: Component = "button",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  as?: any;
  [key: string]: any;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Component
      className={cn(
        "relative inline-flex h-12 overflow-hidden rounded-md p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50",
        containerClassName
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...props}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#5E548E_0%,#BE95C4_50%,#5E548E_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl whitespace-nowrap">
        {children}
        <ArrowRight className={cn("ml-2 h-4 w-4 transition-transform", {
          "translate-x-1": hovered,
        })} />
      </span>
    </Component>
  );
};