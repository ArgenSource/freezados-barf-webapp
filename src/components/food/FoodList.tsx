import { useRouter } from "next/router";
import Link from "next/link";

import { type Food as TFood } from "@prisma/client";

export default function FoodList({ foods }: { foods: TFood[] }) {
  const router = useRouter();
  const { id: spaceId } = router.query;
  if (foods.length < 1)
    return (
      <div>
        <h6>Esta ubicacion esta vacia</h6>
        <Link href={`/space/${spaceId?.toString()}/add-food`}>
          Ingresa un alimento
        </Link>
      </div>
    );
  return (
    <div className="flex h-full w-full flex-col gap-0">
      {foods.map((f) => (
        <Food key={f.id} foodData={f} />
      ))}
    </div>
  );
}

function Food({ foodData }: { foodData: TFood }) {
  return (
    <div className="flex w-full justify-between p-1">
      <div>
        data {foodData.name} {foodData.ammount}g
      </div>
      <div>actions</div>
    </div>
  );
}
