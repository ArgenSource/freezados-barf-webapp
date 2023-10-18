import { useRouter } from "next/router";

import Ubication from "~/components/ubication/Ubication";
import Loader from "~/components/common/Loader";

import { api } from "~/utils/api";
import Container from "~/components/common/Container";

export default function UbicationPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data, status } = api.ubication.getById.useQuery(
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
        return <h1>oops</h1>;
    }
  };
  return (
    <>
      <main>
        <Container>{renderData()}</Container>
      </main>
    </>
  );
}
