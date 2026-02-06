import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// className 工具：合并条件类名并去重 Tailwind 冲突。
// className helper: merges conditional classes and resolves Tailwind conflicts.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
