import { type Ubication as TUbication } from "@prisma/client";

import { PlusCircle, ThermometerSnowflake } from "lucide-react";

import Loader from "../common/Loader";
import { api } from "~/utils/api";
import FoodList from "../food/FoodList";
import Link from "next/link";

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
      {status === "success" ? (
        <>
          {foods.length > 0 ? (
            <>
              <FoodList foods={foods} />
              <Link href={`/ubication/${data.id}/add-food`}>
                <PlusCircle size={32} />
              </Link>
            </>
          ) : (
            <div>
              <h6>Esta ubicacion esta vacia</h6>
              <Link href={`/ubication/${data.id}/add-food`}>
                Ingresa un alimento
              </Link>
            </div>
          )}
        </>
      ) : (
        <Loader />
      )}
    </section>
  );
}
