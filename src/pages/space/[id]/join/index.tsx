import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

import { Loader } from "~/features/common/components";
import { Container } from "~/features/common/components/layout";
import { api } from "~/utils/api";
import QueryErrorBoundary from "~/features/common/components/Error/QueryErrorBoundary";

export default function Join() {
  const session = useSession();
  const join = api.space.join.useMutation();
  const router = useRouter();
  const { id: spaceId } = router.query;
  const {
    data: space,
    isLoading,
    error,
    refetch,
  } = api.space.getById.useQuery(
    { id: spaceId?.toString() ?? "" },
    {
      enabled: !!spaceId,
      refetchOnWindowFocus: false,
    },
  );

  const handleJoin = () => {
    if (space) {
      const id = space.id;

      join
        .mutateAsync({ spaceId: id })
        .then((res) => {
          if (res.id) return router.push(`/space/${id}`);
        })
        .catch((err) =>
          toast.error(
            err instanceof Error ? err.message : "Error al unirse al espacio",
          ),
        );
    }
  };

  return (
    <Container>
      <QueryErrorBoundary error={error?.data} refetch={refetch}>
        {isLoading || !space ? (
          <Loader />
        ) : (
          <>
            <h1>Unirse a {space.name}</h1>
            {session.data?.user ? (
              <>
                {space?.sharedConfig === "PUBLIC_LINK" ? (
                  <button onClick={handleJoin}>Unirse</button>
                ) : (
                  <div>
                    <h6>Este espacio no es publico</h6>
                    <button onClick={() => alert("Not implemented")}>
                      Solicitar acceso
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div>
                <h6>Para unirte a un espacio debes estar registrado</h6>
                <button onClick={() => void signIn()}>Ingresar</button>
              </div>
            )}
          </>
        )}
      </QueryErrorBoundary>
    </Container>
  );
}
