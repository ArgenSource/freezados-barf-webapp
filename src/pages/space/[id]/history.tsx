import { useRouter } from "next/router";

import { BackButton } from "~/features/common/components/Buttons";
import { PageLayout } from "~/features/common/components/layout";
import { HistoryTable } from "~/features/space/components/HistoryTable";
import { api } from "~/utils/api";

export default function SpaceHistory() {
  const router = useRouter();
  const { id: spaceId } = router.query;

  const { data: space } = api.space.getById.useQuery(
    { id: spaceId?.toString() ?? "" },
    {
      enabled: !!spaceId,
      refetchOnWindowFocus: false,
    },
  );
  const spaceName = space?.name ?? "";

  return (
    <PageLayout headTitle={`Historial ${space ? `de ${spaceName}` : ""}`}>
      <BackButton>Volver</BackButton>
      <div className="mb-4 flex w-full items-center justify-center gap-2 text-2xl font-bold text-gray-300">
        <h1>Historial de {spaceName}</h1>
      </div>
      {/* TODO: Agregar titulo - Historial de nombre del espacio... */}
      <HistoryTable />
    </PageLayout>
  );
}
