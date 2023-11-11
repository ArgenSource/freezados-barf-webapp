import { type Ubication as TUbication } from "@prisma/client";

import Ubication from "./Ubication";
import Link from "next/link";

interface IProps {
  ubications?: TUbication[];
  spaceId: string;
}

export default function UbicationList({ ubications, spaceId }: IProps) {
  if (!ubications) return null;
  return (
    <>
      <h2 className="text-xl">Ubicaciones: </h2>
      <Link
        href={`/space/${spaceId?.toString()}/add-ubication`}
        className="w-fit rounded-md text-gray-400 hover:text-gray-600"
      >
        <h3>Agregar ubicacion</h3>
      </Link>
      {ubications.map((u) => (
        <Ubication key={u.id} data={u} />
      ))}
    </>
  );
}
