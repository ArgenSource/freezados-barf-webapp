import Link from "next/link";
import { useRouter } from "next/router";

import Container from "~/features/common/Container";
import Loader from "~/features/common/Loader";
import UbicationList from "~/features/ubication/UbicationList";

import { api } from "~/utils/api";
import Head from "next/head";
import { SpaceHeader } from "~/features/space/SpaceHeader";

export default function Space() {
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
        <title>{space ? `Espacio - ${space?.name}` : "Freezados BARF"}</title>
      </Head>
      <main className="h-screen bg-zinc-900 text-violet-300">
        <Container>
          {status == "loading" && <Loader />}
          {status == "success" && space && (
            <>
              <SpaceHeader spaceName={space.name} />
              {space.ubications.length > 0 ? (
                <UbicationList
                  ubications={space?.ubications}
                  spaceId={spaceId as string}
                />
              ) : (
                <div className="mt-8 flex flex-col items-center gap-6">
                  <h2 className="text-center text-xl font-bold text-gray-600">
                    No tienes ubicaciones registradas
                  </h2>
                  <Link
                    href={`/space/${spaceId?.toString()}/add-ubication`}
                    className="w-fit rounded-md bg-cyan-600 p-4 text-xl font-bold text-gray-100"
                  >
                    <h3>Crea la primera</h3>
                  </Link>
                </div>
              )}
            </>
          )}
        </Container>
      </main>
    </>
  );
}
