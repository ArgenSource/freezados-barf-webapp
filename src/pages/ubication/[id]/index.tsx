import { useRouter } from "next/router";

import Ubication from "~/features/ubication/Ubication";
import Loader from "~/features/common/Loader";

import { api } from "~/utils/api";
import Container from "~/features/common/Container";
import { Error as FormError } from "~/features/common/Form/Error";
import QueryErrorBoundary from "~/features/common/Error/QueryErrorBoundary";

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
          return <Ubication data={data} />;
        }
      case "error":
      default:
        return <FormError />;
    }
  };
  return (
    <>
      <main>
        <QueryErrorBoundary error={error?.data} refetch={refetch}>
          <Container>{renderData()}</Container>
        </QueryErrorBoundary>
      </main>
    </>
  );
}
