import { type FC } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { api } from "~/utils/api";
import type { ActionProps } from "../types";
import { ACTIONS } from "../constants";
import { renderErrorToast } from "~/features/common/utils/renderErrorToast";

export const DeleteFood: FC<ActionProps> = ({
  data: { id, ubicationId },
  active,
  refetchFunction,
  setSelect,
}) => {
  const deleteFood = api.food.deleteById.useMutation({
    onSuccess: async () => {
      await refetchFunction(ubicationId ?? undefined);
    },
  });

  const confirmDelete = () => {
    if (active) {
      deleteFood
        .mutateAsync({ id: id })
        .then(() => toast.success("Alimento eliminado"))
        .catch((err) => renderErrorToast(err, "Error al eliminar alimento"));
    }
  };

  return (
    <div
      onClick={() => setSelect(ACTIONS.DELETE)}
      className="flex items-center gap-1"
    >
      <button onClick={confirmDelete}>
        <Trash2 className={active ? "text-red-600" : "text-gray-500"} />
      </button>
    </div>
  );
};
