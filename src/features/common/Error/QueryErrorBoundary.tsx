import type { PropsWithChildren } from "react";
import { type DefaultErrorShape } from "@trpc/server/dist/error/formatter";
import { type typeToFlattenedError } from "zod";
import { type TRPC_ERROR_CODE_KEY } from "@trpc/server/rpc";
import AuthError from "./AuthError";

type ErrorProps = {
  error:
    | (DefaultErrorShape["data"] & {
        zodError: typeToFlattenedError<unknown, string> | null;
      })
    | null
    | undefined;
  refetch: () => Promise<unknown>;
} & PropsWithChildren;

const renderErrorData = (code: TRPC_ERROR_CODE_KEY) => {
  // Agregar aqui errores a manejar
  switch (code) {
    case "UNAUTHORIZED":
      return <AuthError />;
    default:
      return false;
  }
};

export default function QueryErrorBoundary({
  error,
  refetch,
  children,
}: ErrorProps) {
  if (error) {
    const handleRefetch = () => {
      refetch().catch((err) => console.error(err));
    };
    return (
      renderErrorData(error.code) || (
        <div>
          <h2>Algo no funciono correctamente</h2>
          <p>{error.code}</p>
          <button onClick={handleRefetch}>Probar de nuevo</button>
        </div>
      )
    );
  } else return children;
}
