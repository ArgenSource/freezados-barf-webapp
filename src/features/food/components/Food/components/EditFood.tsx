import { type FormEvent } from "react";
import { XCircle, Pencil } from "lucide-react";
import { ZodError } from "zod";

import { api } from "~/utils/api";
import { editFood } from "~/utils/schemas/food";
import type { ActionProps } from "../types";
import { ACTIONS } from "../constants";
import { Modal, Input, Textarea } from "~/features/common";
import { SelectFoodType } from "./SelectFoodType";

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
          <Input name="name" defaultValue={food.name} type="text" />
          <Input type="number" defaultValue={food.ammount} name="ammount" />
          <SelectFoodType defaultOpt={food.type} />
          <Textarea name="description" defaultValue={food.description} />
          <button type="submit">GUARDAR</button>
        </form>
      </Modal>
      <button onClick={openModal}>
        <Pencil className={active ? "text-green-500" : "text-cyan-500"} />
      </button>
    </div>
  );
};
