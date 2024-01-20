import { type FormEvent } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { type Space } from "@prisma/client";

import { api } from "~/utils/api";
import { editSpace as editSpaceSchema } from "~/utils/schemas/space";
import useFormErrors from "~/utils/hooks/useFormErrors";
import { renderErrorToast } from "~/features/common/utils/renderErrorToast";
import { FormInput } from "~/features/common/components/Form";
import { SubmitButton } from "~/features/common/components/Buttons";
import PrivacyConfigSelect from "../share/ShareModal/PrivacyConfigSelect";

export const EditSpaceForm = ({ data }: { data: Space }) => {
  const { errors, parseErrors } = useFormErrors(editSpaceSchema);
  const queryClient = useQueryClient();

  const editSpace = api.space.edit.useMutation({
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: getQueryKey(api.space.getWithUbications, { id: data.id }),
      }),
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    form.append("id", data.id);
    const inputs = Object.fromEntries(form.entries());
    if (parseErrors(inputs)) {
      editSpace
        .mutateAsync(editSpaceSchema.parse(inputs))
        .then(() => {
          toast.success("Espacio editado");
          editSpace.reset();
        })
        .catch((err) => renderErrorToast(err, "Error al editar espacio"));
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <FormInput
        fieldName="name"
        displayName="Nombre"
        defaultValue={data.name}
        errors={errors?.name}
      />
      <PrivacyConfigSelect space={data} />
      <SubmitButton status={editSpace.status}>Enviar</SubmitButton>
    </form>
  );
};
