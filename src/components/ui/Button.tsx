import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variants?: "default" | "outline";
}

export default function Button({
  className = "",
  children,
  variants = "default",
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(
        "rounded border px-4 py-2 hover:cursor-pointer transition-colors",
        variants === "default" &&
          " bg-slate-600  text-white  hover:bg-slate-700",
        variants === "outline" && "bg-white text-black hover:bg-neutral-100",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
