import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Container from "~/features/common/Container";
import { api } from "~/utils/api";

export default function Join() {
  const session = useSession();
  const router = useRouter();
  const { id: spaceId } = router.query;
  const { data: space } = api.space.getById.useQuery(
    { id: spaceId as string },
    {
      enabled: !!spaceId,
      refetchOnWindowFocus: false,
    },
  );

  const join = api.space.join.useMutation();

  const handleJoin = () => {
    if (space) {
      const id = space.id;
      join
        .mutateAsync({ spaceId: id })
        .then((res) => {
          if (res.id) return router.push(`/space/${id}`);
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <>
      <Container>
        {space?.sharedConfig === "PUBLIC_LINK" && (
          <button onClick={handleJoin}>Join</button>
        )}
      </Container>
    </>
  );
}
