import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

import QueryErrorBoundary from "~/features/common/Error/QueryErrorBoundary";
import { Loader, Container } from "~/features/common";
import { api } from "~/utils/api";

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
        .catch((err) => console.error(err));
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
