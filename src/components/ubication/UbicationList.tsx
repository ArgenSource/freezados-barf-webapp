import { type Ubication as TUbication } from "@prisma/client"
import Ubication from "./Ubication"
import Link from "next/link";

export default function UbicationList({ ubications }: { ubications?: TUbication[] }) {
    if (!ubications) return null;
    if (ubications.length < 1) return (
     <>
        <h2>No tienes ubicaciones registradas</h2>
        <Link href="/">
            <h3>Crea la primera</h3>
        </Link>
     </>   
    )
  return (
    <>                        
        <h2>Ubicaciones: </h2>
        {ubications.map(u => 
            <Ubication key={u.id} data={u} />
        )}
    </>
  )
}
