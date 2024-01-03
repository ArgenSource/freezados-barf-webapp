import { useRouter } from "next/router";

import { UbicationPage as UbicationPageComponent } from "~/features/ubication/UbicationPage";
import { api } from "~/utils/api";
import { Loader } from "~/features/common/components";
import QueryErrorBoundary from "~/features/common/components/Error/QueryErrorBoundary";
import { Error } from "~/features/common/components/Form";
import { PageLayout } from "~/features/common/components/layout";

export default function UbicationPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data, status, error, refetch } = api.ubication.getById.useQuery(
    { id: id?.toString() ?? "" },
    { enabled: !!id },
  );

  const renderData = () => {
    switch (status) {
      case "loading":
        return <Loader />;
      case "success":
        if (data) {
          return <UbicationPageComponent data={data} />;
        }
      case "error":
      default:
        return <Error />;
    }
  };

  return (
    <PageLayout headTitle={`Freezados | ${data?.name ?? "Ubicación"}`}>
      <QueryErrorBoundary error={error?.data} refetch={refetch}>
        {renderData()}
      </QueryErrorBoundary>
    </PageLayout>
  );
}
