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

  const parseErrors = (inputs: unknown) => {
    const parsed = schema.safeParse(inputs);
    if (parsed.success) {
      // TODO: Cambiar porque devuelva parsed.data ? -> deberia ser el objeto todo OK
      return true;
    } else {
      setErrors(parsed.error.format());
      // TODO: Cambiar por un throw? Conviene manejarlo con bool o directamente en el catch?
      return false;
    }
  };

  return { errors, parseErrors };
}
