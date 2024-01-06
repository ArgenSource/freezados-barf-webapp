import { useState, type FC } from "react";
import { ArrowBigDownDash } from "lucide-react";
import { toast } from "sonner";

import { api } from "~/utils/api";
import type { ActionProps } from "../types";
import { ACTIONS } from "../constants";
import { Modal } from "~/features/common/components";
import { Button } from "~/features/common/components/Buttons";
import { renderErrorToast } from "~/features/common/utils/renderErrorToast";

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
        .then(() => {
          // TODO: Set conditional toast message.
          // If ammountToConsume === ammount, then "Alimento consumido"
          // else "Consumiste x gramos de alimento (o del nombre)"
          toast.success("Alimento consumido");
          closeModal();
        })
        .catch((err) => renderErrorToast(err, "Error al consumir alimento"));
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
            className="text w-16  rounded-sm px-1 text-right text-lg"
          />
          <span className="ml-1">g</span>
        </label>
        <Button secondary onClick={consumeFood}>
          Consumir
        </Button>
      </Modal>
      <button onClick={consumeFood}>
        <ArrowBigDownDash
          className={active ? "text-green-500" : "text-cyan-500"}
        />
      </button>
    </div>
  );
};
