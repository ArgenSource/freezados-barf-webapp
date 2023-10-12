import { type Ubication as TUbication } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";

import Ubication from "./Ubication";

export default function UbicationList({
  ubications,
}: {
  ubications?: TUbication[];
}) {
  const router = useRouter();
  const { id } = router.query;

  if (!ubications || !id) return null;
  if (ubications.length < 1)
    return (
      <>
        <h2>No tienes ubicaciones registradas</h2>
        <Link href={`/space/${id.toString()}/add-ubication`}>
          <h3>Crea la primera</h3>
        </Link>
      </>
    );
  return (
    <>
      <h2>Ubicaciones: </h2>
      {ubications.map((u) => (
        <Ubication key={u.id} data={u} />
      ))}
    </>
  );
}
