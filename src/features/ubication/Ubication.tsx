import { type Ubication as TUbication } from "@prisma/client";
import { PlusCircle, ThermometerSnowflake } from "lucide-react";
import Link from "next/link";

import { api } from "~/utils/api";
import FoodList from "../food/components/FoodList";
import { Loader } from "../common/components";
import { Button } from "../common/components/Buttons";

export default function Ubication({ data }: { data: TUbication }) {
  const { data: foods, status } = api.food.getFromUbication.useQuery(
    {
      ubicationId: data.id,
    },
    { refetchOnWindowFocus: false },
  );

  return (
    <section className="w-full py-2">
      <div>
        <h3 className="flex items-center justify-end gap-2 pr-2 text-2xl">
          {data.name}{" "}
          {data.isFreezer && (
            <ThermometerSnowflake size={20} className="text-cyan-600" />
          )}
        </h3>
      </div>
      {status === "success" ? (
        <div className="rounded-lg border-2 border-dashed border-gray-500 p-2">
          {foods.length > 0 ? (
            <>
              <FoodList foods={foods} />
              <Link href={`/ubication/${data.id}/add-food`}>
                <Button>
                  <PlusCircle size={32} />
                </Button>
              </Link>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 p-4">
              <h6 className="text-lg text-gray-600">
                Esta ubicacion esta vacia
              </h6>
              <Link href={`/ubication/${data.id}/add-food`}>
                <Button gray>Ingresa un alimento</Button>
              </Link>
            </div>
          )}
        </div>
      ) : (
        <Loader />
      )}
    </section>
  );
}
