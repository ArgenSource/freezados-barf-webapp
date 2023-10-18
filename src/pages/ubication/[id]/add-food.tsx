import { type FormEvent } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import { type FType, FOOD_ICONS } from "~/utils/icons/foodStyleIcons";
import Container from "~/components/common/Container";
import { ChevronLeftCircle } from "lucide-react";

import { api } from "~/utils/api";
import { createFood } from "~/utils/schemas/food";

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
        .then(() => router.back())
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
          <button onClick={() => router.back()}>
            <ChevronLeftCircle size={32} />
          </button>
          <h1>Add new food</h1>
          <form onSubmit={handleSubmit}>
            <input type="text" id="name" name="name" required />
            {[...FOOD_ICONS.keys()].map((opt: FType) => (
              <label htmlFor={`type-${opt}`} key={`type-${opt}`}>
                <input
                  id={`type-${opt}`}
                  type="radio"
                  value={opt}
                  name="type"
                />
                {FOOD_ICONS.get(opt)}
              </label>
            ))}
            <input type="number" name="ammount" id="ammount" min={1} required />
            <span>g</span>
            <textarea name="description" id="description" />
            <input type="submit" />
          </form>
        </Container>
      </main>
    </>
  );
}
