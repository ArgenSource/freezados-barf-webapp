import { type FormEvent } from "react";
import { XCircle, Pencil } from "lucide-react";

import { api } from "~/utils/api";
import { editFood } from "~/utils/schemas/food";

import type { ActionProps } from "../types";
import { ACTIONS } from "../constants";
// import { useState } from "react";
import Modal from "~/features/common/Modal";
import SelectType from "./SelectType";

export const Edit: React.FC<ActionProps> = ({
  data: food,
  refetchFunction,
  active,
  setSelect,
}) => {
  const openModal = () => setSelect(ACTIONS.EDIT);
  const closeModal = () => setSelect(ACTIONS.NONE);
  // const [name, setName] = useState(food.name);
  // const [ammount, setAmmount] = useState(food.ammount);

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
      console.error(err);
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
          {/* TODO: Usar libreria de forms */}
          <input
            id="name"
            name="name"
            defaultValue={food.name}
            // value={name}
            // onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            defaultValue={food.ammount}
            name="ammount"
            id="ammount"
            // value={ammount}
            // onChange={(e) => setAmmount(Number(e.target.value))}
          />
          <SelectType defaultOpt={food.type} />
          <textarea
            name="description"
            id="description"
            className="rounded-md border-2 p-1"
            defaultValue={food.description}
          />
          <button type="submit">GUARDAR</button>
        </form>
      </Modal>
      <button onClick={openModal}>
        <Pencil className={active ? "text-green-500" : "text-cyan-500"} />
      </button>
    </div>
  );
};
