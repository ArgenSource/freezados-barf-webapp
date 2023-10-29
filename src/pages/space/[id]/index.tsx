import Link from "next/link";
import { useRouter } from "next/router";

import { Container as ContainerIcon } from "lucide-react";

import Container from "~/features/common/Container";
import Loader from "~/features/common/Loader";
import UbicationList from "~/features/ubication/UbicationList";

import { api } from "~/utils/api";
import Head from "next/head";

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
      <main>
        <Container>
          {status == "loading" && <Loader />}
          {status == "success" && space && (
            <>
              <div className="flex w-full items-center justify-center gap-2 text-2xl font-bold text-gray-300">
                <ContainerIcon />
                <h1>{space.name}</h1>
              </div>
              <Link href="/" className="mb-4 text-gray-400">
                Volver al listado de espacios
              </Link>
              {space.ubications.length > 0 ? (
                <UbicationList ubications={space?.ubications} />
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
