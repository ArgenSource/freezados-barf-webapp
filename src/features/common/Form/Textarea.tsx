import type { PropsWithChildren, InputHTMLAttributes } from "react";

type InputProps = {
  name: string;
  error?: string;
  displayName?: string;
};

export function Textarea({
  className,
  name,
  displayName,
  error,
  ...props
}: PropsWithChildren<InputProps & InputHTMLAttributes<HTMLTextAreaElement>>) {
  return (
    <div className={className}>
      <label htmlFor={name}>{displayName ?? name}</label>
      <textarea
        className="rounded-md border-2 p-1"
        id={name}
        name={name}
        {...props}
      />
      <p
        id={`${name}-error`}
        className={`text-sm italic text-red-600 ${error ? "block" : "hidden"}`}
      >
        {error}
      </p>
    </div>
  );
}
