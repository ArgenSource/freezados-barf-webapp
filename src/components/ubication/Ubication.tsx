import { type Ubication as TUbication } from "@prisma/client"

export default function Ubication({ data }: { data: TUbication }) {
  return (
    <section>
        <h3>{data.name}</h3>
        <div>
            tabla con las comidas
        </div>
    </section>
  )
}
