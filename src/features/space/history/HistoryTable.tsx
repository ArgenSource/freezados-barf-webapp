import { type FoodTypes } from "@prisma/client";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { twMerge } from "tailwind-merge";

import { FOOD_ICONS } from "~/features/food/utils/foodStyleIcons";
import { api } from "~/utils/api";

interface SpaceHistory {
  id: string;
  name: string;
  description: string;
  ammount: number;
  storedAt: Date;
  freezedAt: Date | null;
  usedAt: Date | null;
  type: FoodTypes;
  ubicationId: string | null;
}

export const HistoryTable = () => {
  const router = useRouter();
  const { id: spaceId } = router.query;

  const { data: spaceHistory } = api.space.getHistory.useQuery<SpaceHistory[]>(
    { id: spaceId?.toString() ?? "" },
    {
      enabled: !!spaceId,
      refetchOnWindowFocus: false,
    },
  );

  const columnHelper = createColumnHelper<SpaceHistory>();

  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => (
        <i className="flex items-center gap-1">
          {FOOD_ICONS.get(info.row.original.type)}

          {info.getValue()}
          {` ${info.row.original.ammount}g`}
        </i>
      ),
    }),
    columnHelper.accessor("storedAt", {
      cell: (info) => <span>{`${format(info.renderValue()!, "dd/MM")}`}</span>,
    }),
    columnHelper.accessor("usedAt", {
      cell: (info) => <span>{`${format(info.renderValue()!, "dd/MM")}`}</span>,
      header: () => <span>Used at</span>,
    }),
    columnHelper.accessor("ubicationId", {
      cell: (info) => {
        const { data: ubication } = api.ubication.getById.useQuery({
          id: info.getValue() ?? "",
        });

        return ubication?.name ?? "";
      },
    }),
  ];

  const table = useReactTable({
    data: spaceHistory ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex justify-center p-2">
      <table>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                const isFirstCell = cell.column.id === "name";
                const isLastCell = cell.column.id === "ubicationId";
                const isMiddleCell = !isFirstCell && !isLastCell;

                return (
                  <td
                    key={cell.id}
                    className={twMerge(
                      "w-fit py-1",
                      isFirstCell ? "pr-1" : "",
                      isLastCell ? "pl-1" : "",
                      isMiddleCell ? "px-1" : "",
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
