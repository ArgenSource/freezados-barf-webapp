import Link from "next/link";
import { useRouter } from "next/router";
import { Container } from "lucide-react";

import UbicationList from "~/features/ubication/UbicationList";
import { api } from "~/utils/api";
import QueryErrorBoundary from "~/features/common/components/Error/QueryErrorBoundary";
import Share from "~/features/space/share";
import { Loader } from "~/features/common/components";
import { PageLayout } from "~/features/common/components/layout";

export default function Space() {
  const router = useRouter();
  const { id: spaceId } = router.query;
  const {
    data: space,
    status,
    error,
    refetch,
  } = api.space.getWithUbications.useQuery(
    { id: spaceId?.toString() ?? "" },
    {
      enabled: !!spaceId,
      refetchOnWindowFocus: false,
    },
  );

  const { data: history } = api.space.getHistory.useQuery(
    { id: spaceId?.toString() ?? "" },
    {
      enabled: !!spaceId,
      refetchOnWindowFocus: false,
    },
  );

  console.log(history);

  return (
    <PageLayout
      headTitle={space ? `Espacio - ${space?.name}` : "Freezados BARF"}
    >
      {status == "loading" && <Loader />}
      <QueryErrorBoundary error={error?.data} refetch={refetch}>
        {status == "success" && space && (
          <>
            <div className="mb-4 flex w-full items-center justify-center gap-2 text-2xl font-bold text-gray-300">
              <Container />
              <h1>{space.name}</h1>
              <Share />
            </div>
            <Link
              href="/"
              className="mb-4 w-fit text-gray-400 hover:text-gray-600"
            >
              Volver al listado de espacios
            </Link>
            {space.ubications.length > 0 ? (
              <UbicationList
                ubications={space?.ubications}
                spaceId={spaceId?.toString() ?? ""}
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
      </QueryErrorBoundary>
    </PageLayout>
  );
}
