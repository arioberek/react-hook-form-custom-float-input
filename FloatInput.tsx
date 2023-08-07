import { Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { UseFormRegisterReturn, useForm } from "react-hook-form";

interface FloatInputProps<T> {
  defaultValue?: string;
  className?: string;
  wrapperClass?: string;
  name: keyof T;
  step?: string;
  min?: string;
  max?: string;
  label?: string;
  placeholder?: string;
  totalDigits?: number;
  register?: UseFormRegisterReturn;
  control?: any;
  setValue: (
    name: string,
    value: string | number,
    options?: { shouldValidate: boolean },
  ) => void;
  errors: ReturnType<typeof useForm>["formState"]["errors"];
}
export function FloatInput<T>({
  defaultValue,
  className,
  wrapperClass,
  name,
  step,
  min,
  max,
  label,
  placeholder,
  totalDigits,
  register,
  control,
  setValue,
  errors,
  ...rest
}: FloatInputProps<T> &
  Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "name" | "defaultValue" | "type" | "step" | "min" | "max"
  >) {
  const [inputValue, setInputValue] = useState<string | number>("0.00");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = event.target;
    let numericValue = value.replace(/[^\d]/g, "");
    let intValue = parseInt(numericValue, 10);

    if (isNaN(intValue)) {
      intValue = 0;
    }

    if (intValue > 99999) {
      return;
    }

    let newStringValue = (intValue / 100).toFixed(2);

    setInputValue(newStringValue);
    setValue(name as string, newStringValue);
  };

  return (
    <div className={"flex flex-col space-y-2"}>
      <Label htmlFor={String(name)}>{label}</Label>
      <TextInput
        data-numeric-input
        {...rest}
        id={String(name)}
        name={String(name)}
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
      />

      {errors[name]?.message && (
        <p className="text-red-500">{errors[name]?.message as string}</p>
      )}
    </div>
  );
}
