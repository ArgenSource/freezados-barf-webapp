import { useRouter } from "next/router";

import Container from "~/features/common/Container";
import Loader from "~/features/common/Loader";

import { api } from "~/utils/api";
import Head from "next/head";
import Link from "next/link";

export default function UbicationHistory() {
  const router = useRouter();
  const { id, ubicationId } = router.query;

  const { data: ubication, status } = api.ubication.getById.useQuery(
    {
      id: ubicationId as string,
    },
    { refetchOnWindowFocus: false },
  );

  return (
    <>
      <Head>
        <title>
          {ubication ? `Historial ${ubication?.name}` : "Freezados BARF"}
        </title>
      </Head>
      <main className="h-screen bg-zinc-900 text-violet-300">
        <Container>
          {status == "loading" && <Loader />}
          {status == "success" && ubication && (
            <>
              <h1 className="mb-6 text-center text-2xl font-bold text-violet-300">
                Historial de {ubication.name}
              </h1>
            </>
          )}
          <Link href={`/space/${id as string}`}>Volver al espacio</Link>
        </Container>
      </main>
    </>
  );
}
