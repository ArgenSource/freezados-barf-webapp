import { useRouter } from "next/router";

import { api } from "~/utils/api";
import { Loader } from "~/features/common/components";
import QueryErrorBoundary from "~/features/common/components/Error/QueryErrorBoundary";
import { Error } from "~/features/common/components/Form";
import { PageLayout } from "~/features/common/components/layout";
import { BackButton } from "~/features/common/components/Buttons";
import { Ubication } from "~/features/ubication/list/Ubication";
import { EditUbicationForm } from "~/features/ubication/edit/EditUbicationForm";
import { DeleteUbicationButton } from "~/features/ubication/delete/DeleteUbicationButton";

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
          return (
            <>
              <BackButton />
              <Ubication data={data} />
              <EditUbicationForm data={data} />
              <DeleteUbicationButton data={data} />
            </>
          );
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
