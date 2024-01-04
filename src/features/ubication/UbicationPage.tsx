import { type FormEvent } from "react";
import { type Ubication as TUbication } from "@prisma/client";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";

import { api } from "~/utils/api";
import { editUbication as editUbicationSchema } from "~/utils/schemas/ubication";
import Ubication from "./Ubication";
import { BackButton, Button, SubmitButton } from "../common/components/Buttons";
import useFormErrors from "~/utils/hooks/useFormErrors";
import { FormInput, Textarea } from "../common/components/Form";

const DELETE_WARNING =
  "¿Estás seguro que quieres eliminar esta ubicación?\n" +
  "Todos los alimentos que se encuentren en el se borrarán y no podrán ser recuperados.\n" +
  "Cámbialos de ubicación primero si deseas conservarlos";

const FREEZER_RESET_WARNING =
  "¿Estás seguro que la ubicación no es un freezer?\n" +
  "Si tienes alimentos en periodo de congelado su progreso se reiniciará";

export function UbicationPage({ data }: { data: TUbication }) {
  const router = useRouter();
  const deleteUbication = api.ubication.delete.useMutation();

  const handleDeletion = () => {
    if (confirm(DELETE_WARNING)) {
      deleteUbication
        .mutateAsync({ id: data.id })
        .then(async () => {
          toast.success("Ubicacion eliminada");
          await router.push(`/space/${data.spaceId}`);
        })
        .catch((err) => {
          toast.error(
            err instanceof Error ? err.message : "Error al eliminar ubicacion",
          );
        });
    }
  };

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
  const { errors, parseErrors } = useFormErrors(editUbicationSchema);

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
        .catch((err) =>
          toast.error(
            err instanceof Error ? err.message : "Error al eliminar ubicacion",
          ),
        );
    }
  };

  return (
    <>
      <BackButton />
      <Ubication data={data} />
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
      <Button bigFont className="bg-red-500" onClick={handleDeletion}>
        Eliminar
      </Button>
    </>
  );
}
