import { type HTMLProps } from "react";
import { twMerge } from "tailwind-merge";
import { Label, Input, Error } from "./index";

type ParsedErrors = {
  _errors: string[];
};

type FormElements = {
  label?: JSX.Element;
  input?: JSX.Element;
  error?: JSX.Element;
};

type FormInputProps = {
  fieldName: string;
  errors?: ParsedErrors;
  displayName?: string;
  elements?: FormElements;
  required?: boolean;
} & HTMLProps<HTMLDivElement>;

// Returns default form input for not provided elements.

export const FormInput = ({
  fieldName,
  displayName,
  errors,
  elements,
  required = false,
  ...props
}: FormInputProps) => {
  const styles = twMerge("", props.className);
  return (
    <div className={styles}>
      {elements?.label ?? (
        <Label htmlFor={fieldName} text={displayName ?? fieldName} />
      )}
      {elements?.input ?? (
        <Input
          type="text"
          id={fieldName}
          name={fieldName}
          required={required}
        />
      )}
      {elements?.error ??
        errors?._errors.map((msg, index) => (
          <Error message={msg} key={`${fieldName}-error-message-${index}`} />
        ))}
    </div>
  );
};
