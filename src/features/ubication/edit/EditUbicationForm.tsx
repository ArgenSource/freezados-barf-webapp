import React, { type FormEvent } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { type Ubication as TUbication } from "@prisma/client";

import { api } from "~/utils/api";
import { editUbication as editUbicationSchema } from "~/utils/schemas/ubication";
import useFormErrors from "~/utils/hooks/useFormErrors";
import { renderErrorToast } from "../../common/utils/renderErrorToast";
import { FormInput, Textarea } from "../../common/components/Form";
import { SubmitButton } from "../../common/components/Buttons";
import { FREEZER_RESET_WARNING } from "../constants";

export const EditUbicationForm = ({ data }: { data: TUbication }) => {
  const { errors, parseErrors } = useFormErrors(editUbicationSchema);
  const queryClient = useQueryClient();

  const editUbication = api.ubication.edit.useMutation({
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: getQueryKey(api.ubication.getById, { id: data.id }),
        }),
        queryClient.invalidateQueries({
          queryKey: getQueryKey(api.food.getFromUbication, {
            ubicationId: data.id,
          }),
        }),
      ]),
  });
  const handleEdit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputs = new FormData(e.currentTarget);

    inputs.append("id", data.id);
    if (
      parseErrors({
        ...Object.fromEntries(inputs.entries()),
        isFreezer: inputs.get("isFreezer") == "on",
      })
    ) {
      if (
        data.isFreezer &&
        !inputs.get("isFreezer") &&
        !confirm(FREEZER_RESET_WARNING)
      )
        return;
      editUbication
        .mutateAsync(
          editUbicationSchema.parse({
            ...Object.fromEntries(inputs.entries()),
            isFreezer: inputs.get("isFreezer") == "on",
          }),
        )
        .then(() => {
          toast.success("Ubicacion editada");
          editUbication.reset();
        })
        .catch((err) => renderErrorToast(err, "Error al editar ubicacion"));
    }
  };

  return (
    <form onSubmit={handleEdit}>
      <FormInput
        fieldName="name"
        displayName="Nombre"
        defaultValue={data.name}
        errors={errors?.name}
      />
      <FormInput
        fieldName="description"
        displayName="Descripcion (opcional)"
        elements={{
          input: (
            <Textarea
              name="description"
              id="description"
              defaultValue={data.description}
            />
          ),
        }}
        errors={errors?.description}
      />
      <FormInput
        fieldName="isFreezer"
        displayName="Es un freezer?"
        elements={{
          label: <></>,
          input: (
            <label className="flex gap-4">
              Es un freezer?
              <input
                type="checkbox"
                name="isFreezer"
                id="isFreezer"
                defaultChecked={data.isFreezer}
              />
            </label>
          ),
        }}
        errors={errors?.isFreezer}
      />
      <SubmitButton
        status={editUbication.status}
        errorMessage={editUbication.error?.message}
        bigFont
      >
        Editar
      </SubmitButton>
    </form>
  );
};
