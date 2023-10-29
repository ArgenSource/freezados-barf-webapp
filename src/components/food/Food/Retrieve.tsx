import { useState, type FC } from "react";
import { ArrowBigDownDash } from "lucide-react";

import { api } from "~/utils/api";
import type { ActionProps } from "./types";

export const Retrieve: FC<ActionProps> = ({
  data: { ammount, id, ubicationId },
  active,
  refetchFunction,
  setSelect,
}) => {
  const [retrieveAmmount, setRetrieveAmmount] = useState<number>(ammount);

  const retrieve = api.food.consume.useMutation({
    onSuccess: async () => {
      await refetchFunction(ubicationId ?? undefined);
    },
  });

  const retrieveFood = () => {
    if (active) {
      retrieve
        .mutateAsync({
          id: id,
          ammount: Math.min(retrieveAmmount, ammount),
        })
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
    }
  };
  return (
    <div
      onClick={() => setSelect("CONSUME")}
      className="flex items-center gap-1"
    >
      <label
        className={`${active ? "block" : "hidden"} w-min whitespace-nowrap`}
      >
        <input
          type="number"
          max={ammount}
          step={1}
          min={0}
          value={retrieveAmmount}
          onChange={(e) => setRetrieveAmmount(parseInt(e.target.value))}
          className="text w-16 px-1 text-right"
        />
        <span className="ml-1">g</span>
      </label>
      <button onClick={retrieveFood}>
        <ArrowBigDownDash
          className={active ? "text-green-500" : "text-cyan-500"}
        />
      </button>
    </div>
  );
};
