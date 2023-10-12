import { type FormEvent } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import { FoodTypes } from "@prisma/client";
import { Beef, Drumstick, Fish, PiggyBank } from "lucide-react";
import Container from "~/components/common/Container";

import { api } from "~/utils/api";
import { createFood } from "~/utils/schemas/food";

const ICONS = {
  [FoodTypes.COW]: <Beef />,
  [FoodTypes.FISH]: <Fish />,
  [FoodTypes.PORK]: <PiggyBank />,
  [FoodTypes.CHICKEN]: <Drumstick />,
};

export default function AddFood() {
  const router = useRouter();
  const { id: ubicationId } = router.query;

  const addFood = api.food.create.useMutation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!ubicationId) return;
    const formData = new FormData(e.currentTarget);
    formData.append("ubicationId", ubicationId.toString());
    try {
      const input = createFood.parse(Object.fromEntries(formData.entries()));
      addFood
        .mutateAsync(input)
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <Head>
        <title>Add new food</title>
      </Head>
      <main>
        <Container>
          <h1>Add new food</h1>
          <form onSubmit={handleSubmit}>
            <input type="text" id="name" name="name" required />
            {Object.keys(ICONS).map((opt) => (
              <label htmlFor={`type-${opt}`} key={`type-${opt}`}>
                <input
                  id={`type-${opt}`}
                  type="radio"
                  value={opt}
                  name="type"
                />
                {ICONS[opt as keyof typeof ICONS]}
              </label>
            ))}
          </form>
        </Container>
      </main>
    </>
  );
}
