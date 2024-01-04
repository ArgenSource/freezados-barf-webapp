import { type FormEvent } from "react";
import { Pencil } from "lucide-react";
import { toast } from "sonner";

import { api } from "~/utils/api";
import { editFood } from "~/utils/schemas/food";
import type { ActionProps } from "../types";
import { ACTIONS } from "../constants";
import { Modal } from "~/features/common/components";
import { SelectFoodType } from "./SelectFoodType";
import {
  Input,
  Textarea,
  Datetime,
  FormInput,
} from "~/features/common/components/Form";
import useFormErrors from "~/utils/hooks/useFormErrors";
import { SubmitButton } from "~/features/common/components/Buttons";

export const EditFood: React.FC<ActionProps> = ({
  data: food,
  refetchFunction,
  active,
  setSelect,
}) => {
  const { errors, parseErrors, resetErrors } = useFormErrors(editFood);
  const edit = api.food.editFoodData.useMutation();

  const openModal = () => setSelect(ACTIONS.EDIT);
  const closeModal = () => {
    resetErrors();
    edit.reset();
    setSelect(ACTIONS.NONE);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (
      parseErrors({ ...Object.fromEntries(formData.entries()), id: food.id })
    ) {
      const input = editFood.parse({
        ...Object.fromEntries(formData.entries()),
        id: food.id,
      });

      edit
        .mutateAsync(input)
        .then(async (res) => {
          if (res.ubicationId) {
            await refetchFunction(res.ubicationId);
            toast.success("Alimento editado");
            closeModal();
          }
        })
        .catch((err) => {
          toast.error(
            err instanceof Error ? err.message : "Error al editar alimento",
          );
        });
    }
  };

  return (
    <div>
      <Modal
        open={active}
        onClickOutside={closeModal}
        className="flex w-full max-w-md flex-col items-center justify-center rounded-md bg-gray-500 p-4"
      >
        <form className="flex flex-col gap-2" onSubmit={onSubmit}>
          <FormInput
            fieldName="name"
            displayName="Nombre"
            defaultValue={food.name}
            errors={errors?.name}
          />
          <FormInput
            fieldName="ammount"
            displayName="Cantidad"
            elements={{
              input: (
                <Input
                  type="number"
                  defaultValue={food.ammount}
                  min={1}
                  name="ammount"
                  id="ammount"
                />
              ),
            }}
            errors={errors?.ammount}
          />
          <FormInput
            fieldName="type"
            displayName="Tipo"
            elements={{
              input: <SelectFoodType defaultOpt={food.type} />,
            }}
            errors={errors?.type}
          />
          <FormInput
            fieldName="description"
            displayName="Descripción"
            elements={{
              input: (
                <Textarea name="description" defaultValue={food.description} />
              ),
            }}
            errors={errors?.description}
          />
          <div className="hidden">
            <Datetime name="freezeDate" defaultDate={food.freezedAt} />
          </div>
          <div className="hidden">
            <Datetime name="storeDate" defaultDate={food.storedAt} />
          </div>
          <SubmitButton status={edit.status} errorMessage={edit.error?.message}>
            GUARDAR
          </SubmitButton>
        </form>
      </Modal>
      <button onClick={openModal}>
        <Pencil className={active ? "text-green-500" : "text-cyan-500"} />
      </button>
    </div>
  );
};
