import { type Ubication as TUbication } from "@prisma/client";
import Link from "next/link";

import Ubication from "./Ubication";

interface IProps {
  ubications?: TUbication[];
  spaceId: string;
}

export default function UbicationList({ ubications, spaceId }: IProps) {
  if (!ubications) return null;

  return (
    <div className="mb-4">
      <h2 className="text-xl">Ubicaciones: </h2>
      <Link
        href={`/space/${spaceId?.toString()}/add-ubication`}
        className="mb-4 w-fit rounded-md text-gray-400 hover:text-gray-300"
      >
        <h3 className="mb-2">Agregar ubicacion</h3>
      </Link>
      {ubications.map((u) => (
        <Ubication key={u.id} data={u} />
      ))}
    </div>
  );
}
