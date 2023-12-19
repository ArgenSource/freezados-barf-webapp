import { useState, type FC } from "react";
import { ArrowBigDownDash } from "lucide-react";

import { api } from "~/utils/api";
import type { ActionProps } from "../types";
import { ACTIONS } from "../constants";
import { Modal } from "~/features/common";

export const ConsumeFood: FC<ActionProps> = ({
  data: { ammount, id, ubicationId },
  active,
  refetchFunction,
  setSelect,
}) => {
  const [ammountToConsume, setAmmountToConsume] = useState<number>(ammount);
  const openModal = () => setSelect(ACTIONS.CONSUME);
  const closeModal = () => setSelect(ACTIONS.NONE);

  const consume = api.food.consume.useMutation({
    onSuccess: async () => {
      await refetchFunction(ubicationId ?? undefined);
    },
  });

  const consumeFood = () => {
    if (active) {
      consume
        .mutateAsync({
          id: id,
          ammount: Math.min(ammountToConsume, ammount),
        })
        .then((res) => {
          console.log(res);
          closeModal();
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div onClick={openModal} className="flex items-center gap-1">
      <Modal
        open={active}
        onClickOutside={closeModal}
        className="flex w-full max-w-md flex-col items-center justify-center rounded-md bg-gray-500 p-4"
      >
        <label
          className={`${active ? "block" : "hidden"} w-min whitespace-nowrap`}
        >
          <input
            type="number"
            max={ammount}
            step={1}
            min={0}
            value={ammountToConsume}
            onChange={(e) => setAmmountToConsume(parseInt(e.target.value))}
            className="text w-16 px-1 text-right"
          />
          <span className="ml-1">g</span>
        </label>
        <button onClick={consumeFood}>Consumir</button>
      </Modal>
      <button onClick={consumeFood}>
        <ArrowBigDownDash
          className={active ? "text-green-500" : "text-cyan-500"}
        />
      </button>
    </div>
  );
};
