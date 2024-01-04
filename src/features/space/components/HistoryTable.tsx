import { type FoodTypes } from "@prisma/client";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { useRouter } from "next/router";

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
    // columnHelper.accessor("id", {
    //   id: "id",
    //   cell: (info) => <i>{info.getValue()}</i>,
    //   header: () => <span>ID</span>,
    // }),
    columnHelper.accessor("name", {
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Name</span>,
    }),
    columnHelper.accessor("type", {
      header: () => "Especie",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("ammount", {
      header: () => <span>Cantidad</span>,
      cell: (info) => info.renderValue()?.toString(),
    }),
    columnHelper.accessor("usedAt", {
      header: () => <span>Fecha consumo</span>,
      cell: (info) =>
        info.renderValue() ? format(info.renderValue()!, "d/m/yyyy") : "",
    }),
    columnHelper.accessor("storedAt", {
      header: () => <span>Fecha guardado</span>,
      cell: (info) =>
        info.renderValue() ? format(info.renderValue()!, "d/m/yyyy") : "",
    }),
    columnHelper.accessor("ubicationId", {
      header: () => <span>Ultima ubicacion</span>,
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
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="h-4" />
    </div>
  );
};
