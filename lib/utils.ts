import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { v4 as uuid } from "uuid"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateToken() {
  return uuid()
}

export function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}