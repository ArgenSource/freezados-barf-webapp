import { useRouter } from "next/router";
import Link from "next/link"

import { type Food as TFood } from "@prisma/client"

export default function FoodList({ foods }: { foods: TFood[] }) {
    const router = useRouter();
    const { id: spaceId } = router.query;
    if (foods.length < 1) return (
        <div>
            <h6>Esta ubicacion esta vacia</h6>
            <Link href={`/space/${spaceId?.toString()}/add-food`}>Ingresa un alimento</Link>
        </div>
    )
    return (
    <div className="w-full h-full flex flex-col gap-0">
        {foods.map(f => <Food key={f.id} foodData={f} /> )}
    </div>
  )
}

function Food({ foodData }: { foodData: TFood }) {
    return (
        <div className="w-full p-1 flex justify-between">
            <div>
                data {foodData.name} {foodData.ammount}g
            </div>
            <div>
                actions
            </div>
        </div>
    )
}