import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {nanoid} from "nanoid"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateToken() {
  return  nanoid(12)
}

export function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}