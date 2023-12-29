import { type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Container } from "lucide-react";

import { api } from "~/utils/api";
import { createSpace } from "~/utils/schemas/space";
import { PageLayout } from "~/features/common/components/layout";
import { FormInput } from "~/features/common/components/Form";
import useFormErrors from "~/utils/hooks/useFormErrors";
import { Button, BackButton } from "~/features/common/components/Buttons";

export default function CreateSpace() {
  const router = useRouter();

  const create = api.space.create.useMutation();
  const { errors, parseErrors } = useFormErrors(createSpace);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      if (parseErrors(Object.fromEntries(formData.entries()))) {
        const { name } = createSpace.parse(
          Object.fromEntries(formData.entries()),
        );

        create
          .mutateAsync({ name: name })
          .then((res) => router.push(`space/${res.id}`))
          .catch((err) => console.error(err));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <PageLayout headTitle="Freezados - Crear espacio">
      <BackButton />
      <h1 className="text-center text-2xl">Crea tu espacio</h1>
      <form onSubmit={handleSubmit} className="mt-8 flex w-full flex-col gap-4">
        <FormInput
          fieldName="name"
          displayName="Nombre"
          required
          errors={errors?.name}
        />
        <Button type="submit" bigFont>
          Crear <Container />
        </Button>
      </form>
    </PageLayout>
  );
}
