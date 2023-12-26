import { type FormEvent } from "react";
import { XCircle, Pencil } from "lucide-react";
import { ZodError } from "zod";

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

export const EditFood: React.FC<ActionProps> = ({
  data: food,
  refetchFunction,
  active,
  setSelect,
}) => {
  const openModal = () => setSelect(ACTIONS.EDIT);
  const closeModal = () => setSelect(ACTIONS.NONE);

  const edit = api.food.editFoodData.useMutation();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const input = editFood.parse({
        ...Object.fromEntries(formData.entries()),
        id: food.id,
      });

      edit
        .mutateAsync(input)
        .then(async (res) => {
          if (res.ubicationId) {
            await refetchFunction(res.ubicationId);
            closeModal();
          }
        })
        .catch((err) => console.error(err));
    } catch (err) {
      if (err instanceof ZodError) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <Modal
        open={active}
        onClickOutside={closeModal}
        className="flex w-full max-w-md flex-col items-center justify-center rounded-md bg-gray-500 p-4"
      >
        <button onClick={closeModal} className="absolute right-2 top-2">
          <XCircle size={20} />
        </button>
        <form className="flex flex-col gap-2" onSubmit={onSubmit}>
          <FormInput
            fieldName="name"
            displayName="Nombre"
            defaultValue={food.name}
          />
          <FormInput
            fieldName="ammount"
            displayName="Cantidad"
            elements={{
              input: (
                <Input
                  type="number"
                  defaultValue={food.ammount}
                  min={0}
                  name="ammount"
                  id="ammount"
                />
              ),
            }}
          />
          <FormInput
            fieldName="type"
            displayName="Tipo"
            elements={{
              input: <SelectFoodType defaultOpt={food.type} />,
            }}
          />
          <FormInput
            fieldName="description"
            displayName="Descripción"
            elements={{
              input: (
                <Textarea name="description" defaultValue={food.description} />
              ),
            }}
          />
          <div className="hidden">
            <Datetime name="freezeDate" defaultDate={food.freezedAt} />
          </div>
          <div className="hidden">
            <Datetime name="storeDate" defaultDate={food.storedAt} />
          </div>
          <button type="submit">GUARDAR</button>
        </form>
      </Modal>
      <button onClick={openModal}>
        <Pencil className={active ? "text-green-500" : "text-cyan-500"} />
      </button>
    </div>
  );
};
