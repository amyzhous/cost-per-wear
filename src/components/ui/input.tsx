import * as React from "react";

import { cn } from "./utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-slate-500 dark:placeholder:text-slate-400 selection:bg-primary selection:text-primary-foreground backdrop-blur-xl bg-white/50 dark:bg-white/10 border-white/60 dark:border-white/20 text-slate-900 dark:text-white flex h-9 w-full min-w-0 rounded-xl border px-3 py-1 text-base transition-all outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm shadow-lg",
        "focus-visible:border-white/80 dark:focus-visible:border-white/40 focus-visible:ring-blue-400/40 focus-visible:ring-[3px] focus-visible:bg-white/70 dark:focus-visible:bg-white/15",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
