import { type FormEvent } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";

import { SubmitButton } from "~/features/common/components/Buttons";
import { createUbication as createSchema } from "~/utils/schemas/ubication";
import { api } from "~/utils/api";
import { FormInput, Textarea } from "~/features/common/components/Form";
import useFormErrors from "~/utils/hooks/useFormErrors";
import { renderErrorToast } from "~/features/common/utils/renderErrorToast";

export const AddUbicationForm = () => {
  const createUbication = api.ubication.create.useMutation();
  const router = useRouter();
  const { id: spaceId } = router.query;
  const { errors, parseErrors } = useFormErrors(createSchema);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!spaceId) return;
    const formData = new FormData(e.currentTarget);

    if (
      parseErrors({
        ...Object.fromEntries(formData.entries()),
        isFreezer: formData.get("isFreezer") == "on",
        spaceId: spaceId.toString(),
      })
    ) {
      const input = createSchema.parse({
        ...Object.fromEntries(formData.entries()),
        isFreezer: formData.get("isFreezer") == "on",
        spaceId: spaceId.toString(),
      });

      createUbication
        .mutateAsync(input)
        .then(() => router.push(`/space/${spaceId.toString()}`))
        .then(() => {
          const newUbicationName = formData.get("name")?.toString();

          toast.success(`Nueva ubicacion: ${newUbicationName}`);
        })
        .catch((err) => renderErrorToast(err, "Error al crear ubicacion"));
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
      <FormInput
        fieldName="description"
        displayName="Descripcion (opcional)"
        required
        elements={{
          input: <Textarea name="description" id="description" />,
        }}
        errors={errors?.description}
      />
      <FormInput
        fieldName="isFreezer"
        displayName="Es un freezer?"
        required
        elements={{
          label: <></>,
          input: (
            <label className="flex gap-4">
              Es un freezer?
              <input type="checkbox" name="isFreezer" id="isFreezer" />
            </label>
          ),
        }}
        errors={errors?.isFreezer}
      />

      <SubmitButton
        status={createUbication.status}
        errorMessage={createUbication.error?.message}
        bigFont
      >
        Crear
      </SubmitButton>
    </form>
  );
};
