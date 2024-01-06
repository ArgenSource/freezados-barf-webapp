import React from "react";
import { type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Container } from "lucide-react";
import { toast } from "sonner";

import { api } from "~/utils/api";
import { createSpace } from "~/utils/schemas/space";
import { FormInput } from "~/features/common/components/Form";
import useFormErrors from "~/utils/hooks/useFormErrors";
import { SubmitButton } from "~/features/common/components/Buttons";
import { renderErrorToast } from "~/features/common/utils/renderErrorToast";

export const CreateSpaceForm = () => {
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
        .catch((err) => renderErrorToast(err, "Error al crear espacio"));
    }
  };

  return (
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
  );
};
