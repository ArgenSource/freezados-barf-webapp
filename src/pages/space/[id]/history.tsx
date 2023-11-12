import { useRouter } from "next/router";
import Head from "next/head";

import { Container, Loader } from "~/features/common/components";
import { api } from "~/utils/api";
import { SpaceHeader } from "~/features/space/SpaceHeader";

export default function SpaceHistory() {
  const router = useRouter();
  const { id: spaceId } = router.query;
  const { data: space, status } = api.space.getByid.useQuery(
    { id: spaceId as string },
    {
      enabled: !!spaceId,
      refetchOnWindowFocus: false,
    },
  );

  return (
    <>
      <Head>
        <title>{space ? `Historial - ${space?.name}` : "Freezados BARF"}</title>
      </Head>
      <main className="h-screen bg-zinc-900 text-violet-300">
        <Container>
          {status == "loading" && <Loader />}
          {status == "success" && space && (
            <>
              <SpaceHeader
                spaceName={`Historial - ${space?.name}`}
                linkText={"Volver al espacio"}
                href={`/space/${spaceId as string}`}
              />
            </>
          )}
        </Container>
      </main>
    </>
  );
}
