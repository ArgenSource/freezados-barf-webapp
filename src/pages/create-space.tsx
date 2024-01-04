import { type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Container } from "lucide-react";
import { toast } from "sonner";

import { api } from "~/utils/api";
import { createSpace } from "~/utils/schemas/space";
import { PageLayout } from "~/features/common/components/layout";
import { FormInput } from "~/features/common/components/Form";
import useFormErrors from "~/utils/hooks/useFormErrors";
import {
  Button,
  BackButton,
  SubmitButton,
} from "~/features/common/components/Buttons";

export default function CreateSpace() {
  const router = useRouter();

  const create = api.space.create.useMutation();
  const { errors, parseErrors } = useFormErrors(createSpace);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (parseErrors(Object.fromEntries(formData.entries()))) {
      const { name } = createSpace.parse(
        Object.fromEntries(formData.entries()),
      );

      create
        .mutateAsync({ name: name })
        .then((res) => {
          toast.success("Espacio creado");
          router.push(`space/${res.id}`);
        })
        .catch((err) =>
          toast.error(
            err instanceof Error ? err.message : "Error al crear el espacio",
          ),
        );
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
        <SubmitButton
          status={create.status}
          errorMessage={create.error?.message}
          bigFont
        >
          Crear <Container />
        </SubmitButton>
      </form>
    </PageLayout>
  );
}
