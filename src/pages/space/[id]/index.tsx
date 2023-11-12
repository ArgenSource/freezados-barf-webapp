import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

import UbicationList from "~/features/ubication/UbicationList";
import { Container, Loader } from "~/features/common/components";
import { api } from "~/utils/api";
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
              <SpaceHeader
                spaceName={space.name}
                linkText="Volver al listado de espacios"
                href="/"
              />
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
          {typeof spaceId === "string" && (
            <Link
              href={`${spaceId}/history`}
              className="tracking-wider text-fuchsia-600/60"
            >
              Ver historial
            </Link> // TODO: Can this href can be improved?
          )}
        </Container>
      </main>
    </>
  );
}
