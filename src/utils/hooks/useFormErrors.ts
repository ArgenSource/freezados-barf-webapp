import { useState } from "react";
import type {
  ZodObject,
  ZodFormattedError,
  baseObjectInputType,
  ZodRawShape,
} from "zod";

export default function useFormErrors<T extends ZodRawShape>(
  schema: ZodObject<T>,
) {
  const [errors, setErrors] =
    useState<
      ZodFormattedError<
        { [k in keyof baseObjectInputType<T>]: baseObjectInputType<T>[k] },
        string
      >
    >();

  const resetErrors = () => setErrors(undefined);

  const parseErrors = (inputs: unknown) => {
    const parsed = schema.safeParse(inputs);

    if (parsed.success) {
      resetErrors();

      return true;
    } else {
      setErrors(parsed.error.format());

      return false;
    }
  };

  return { errors, parseErrors, resetErrors };
}
