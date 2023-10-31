import { XCircle, Pencil } from "lucide-react";

import type { ActionProps } from "../types";
import { ACTIONS } from "../constants";
import { useState } from "react";
import Modal from "~/features/common/Modal";

export const EditFood: React.FC<ActionProps> = ({
  data: food,
  // refetchFunction,
  active,
  setSelect,
}) => {
  const openModal = () => setSelect(ACTIONS.EDIT);
  const closeModal = () => setSelect(ACTIONS.NONE);
  const [name, setName] = useState(food.name);
  const [ammount, setAmmount] = useState(food.ammount);

  /* TODO: agregar funcion de editar alimento */

  const onSubmit = () => ({ name, ammount });

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
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <input
            type="number"
            value={ammount}
            onChange={(e) => setAmmount(Number(e.target.value))}
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
