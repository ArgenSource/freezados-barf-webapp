import { type Ubication as TUbication } from "@prisma/client"

import { ThermometerSnowflake } from 'lucide-react';

export default function Ubication({ data }: { data: TUbication }) {
  return (
    <section>
        <h3 className="flex items-center gap-2">
          {data.name} <ThermometerSnowflake size={20} className={data.isFreezer ? "text-cyan-600" : "text-gray-400"} />
        </h3>
        <div>
            tabla con las comidas
        </div>
    </section>
  )
}
