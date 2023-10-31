import type { PropsWithChildren, InputHTMLAttributes } from "react";

type InputProps = {
  name: string;
  error?: string;
  displayName?: string;
};

export function Input({
  className,
  name,
  displayName,
  error,
  ...props
}: PropsWithChildren<InputProps & InputHTMLAttributes<HTMLInputElement>>) {
  return (
    <div className={className}>
      <label htmlFor={name}>{displayName ?? name}</label>
      <input id={name} name={name} {...props} />
      <p
        id={`${name}-error`}
        className={`text-sm italic text-red-600 ${error ? "block" : "hidden"}`}
      >
        * {error}
      </p>
    </div>
  );
}
