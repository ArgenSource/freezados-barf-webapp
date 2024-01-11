import { PageLayout } from "~/features/common/components/layout";
import { BackButton } from "~/features/common/components/Buttons";
import { AddFoodForm } from "~/features/food/add/AddFoodForm";

export default function AddFood() {
  return (
    <PageLayout headTitle="Freezados - Add new food">
      <BackButton />
      <h1 className="text-center text-2xl font-bold">Add new food</h1>
      <AddFoodForm />
    </PageLayout>
  );
}
