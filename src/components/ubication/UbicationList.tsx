import { type Ubication as TUbication } from "@prisma/client";

import Ubication from "./Ubication";

export default function UbicationList({
  ubications,
}: {
  ubications?: TUbication[];
}) {
  if (!ubications) return null;
  return (
    <>
      <h2 className="text-xl">Ubicaciones: </h2>
      {ubications.map((u) => (
        <Ubication key={u.id} data={u} />
      ))}
    </>
  );
}
