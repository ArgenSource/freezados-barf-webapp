import Link from "next/link";
import { useRouter } from "next/router";
import { Container } from "lucide-react";

import UbicationList from "~/features/ubication/list/UbicationList";
import { api } from "~/utils/api";
import QueryErrorBoundary from "~/features/common/components/Error/QueryErrorBoundary";
import { Loader } from "~/features/common/components";
import { PageLayout } from "~/features/common/components/layout";
import { ShareSpace } from "~/features/space/share/ShareSpace";

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
              <ShareSpace />
            </div>
            <Link
              href="/"
              className="mb-4 w-fit text-gray-400 hover:text-gray-300"
            >
              Volver al listado de espacios
            </Link>
            <UbicationList
              ubications={space?.ubications}
              spaceId={spaceId?.toString() ?? ""}
            />
          </>
        )}
      </QueryErrorBoundary>

      <Link
        href={`/space/${spaceId?.toString()}/history`}
        className="text-center hover:text-violet-200"
      >
        Ir al historial de este espacio
      </Link>
    </PageLayout>
  );
}
