import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30",
        "flex h-5 w-full min-w-0 rounded-none border-0 border-b border-input bg-transparent px-1 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:ring-0 focus-visible:border-b-ring focus-visible:border-b-2",
        "aria-invalid:border-b-destructive dark:aria-invalid:border-b-destructive/70",
        className
      )}
      {...props}
    />
  )
}

export { Input }
