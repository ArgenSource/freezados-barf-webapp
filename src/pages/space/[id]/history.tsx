import { useRouter } from "next/router";

import { BackButton } from "~/features/common/components/Buttons";
import { PageLayout } from "~/features/common/components/layout";
import { HistoryTable } from "~/features/space/history/HistoryTable";
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
      <h1 className="mb-4 text-center text-2xl font-bold text-gray-300">
        Historial de {spaceName}
      </h1>
      <HistoryTable />
    </PageLayout>
  );
}
