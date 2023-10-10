import { type Ubication as TUbication } from "@prisma/client";

import { ThermometerSnowflake } from "lucide-react";

import { api } from "~/utils/api";
import FoodList from "../food/FoodList";

export default function Ubication({ data }: { data: TUbication }) {
  const { data: foods, status } = api.food.getFromUbication.useQuery({
    ubicationId: data.id,
  });

  return (
    <section>
      <div>
        <h3 className="flex items-center gap-2">
          {data.name}{" "}
          <ThermometerSnowflake
            size={20}
            className={data.isFreezer ? "text-cyan-600" : "text-gray-400"}
          />
        </h3>
        <p>{data.description}</p>
      </div>
      {status === "success" && <FoodList foods={foods} />}
    </section>
  );
}
