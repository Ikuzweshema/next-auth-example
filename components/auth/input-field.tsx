import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import React, { HTMLInputTypeAttribute } from "react"

interface InputFieldProps {
  label: string
  type: HTMLInputTypeAttribute
  name: string
  placeholder?: string

}
export default function InputField({ label, type, name, placeholder }: InputFieldProps) {
  return <div className="grid gap-2">
    <Label htmlFor={name}>{label}</Label>
    <Input
      id={name}
      type={type}
      placeholder={placeholder}
      name={name}
      required
    />

  </div>
}