import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

import QueryErrorBoundary from "~/features/common/components/Error/QueryErrorBoundary";
import { Loader } from "~/features/common/components";
import { Container } from "~/features/common/components/layout";
import { api } from "~/utils/api";
import { renderErrorToast } from "~/features/common/utils/renderErrorToast";

export default function JoinWithIvitation() {
  const router = useRouter();
  const session = useSession();
  const { id: spaceId, inv_id: invitationId } = router.query;
  const {
    data: space,
    error,
    refetch,
    isLoading,
  } = api.space.getById.useQuery(
    { id: spaceId?.toString() ?? "" },
    { enabled: !!spaceId },
  );
  const join = api.space.joinWithInvitation.useMutation();

  const handleJoin = () => {
    if (space && invitationId) {
      join
        .mutateAsync({
          spaceId: space.id,
          invitationId: invitationId.toString() ?? "",
        })
        .then((res) => router.push(`/space/${res.id}`))
        .catch((err) => renderErrorToast(err, "Error al unirse al espacio"));
    }
  };

  return (
    <Container>
      <QueryErrorBoundary error={error?.data} refetch={refetch}>
        {isLoading || !space ? (
          <Loader />
        ) : (
          <>
            <h1>Fuiste invitado a unirte a {space.name}</h1>
            {session.data?.user ? (
              <button onClick={handleJoin}>Unirme</button>
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
