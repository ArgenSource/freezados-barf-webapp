import { BackButton } from "~/features/common/components/Buttons";
import { PageLayout } from "~/features/common/components/layout";
import { AddUbicationForm } from "~/features/ubication/add/AddUbicationForm";

export default function AddUbication() {
  return (
    <PageLayout headTitle="Freezados - Add new ubication">
      <BackButton />
      <h1 className="text-center text-2xl font-bold">Agregar ubicacion</h1>
      <AddUbicationForm />
    </PageLayout>
  );
}
