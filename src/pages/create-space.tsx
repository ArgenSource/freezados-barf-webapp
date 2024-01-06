import { PageLayout } from "~/features/common/components/layout";
import { BackButton } from "~/features/common/components/Buttons";
import { CreateSpaceForm } from "~/features/space/create/CreateSpaceForm";

export default function CreateSpace() {
  return (
    <PageLayout headTitle="Freezados - Crear espacio">
      <BackButton />
      <h1 className="text-center text-2xl">Crea tu espacio</h1>
      <CreateSpaceForm />
    </PageLayout>
  );
}
