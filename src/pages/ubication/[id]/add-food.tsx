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
          <h1 className="text-center text-2xl font-bold">Add new food</h1>
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex w-full flex-col items-center gap-4"
          >
            <label htmlFor="name">
              <p>Nombre</p>
              <input
                type="text"
                id="name"
                name="name"
                className="rounded-md border-2 p-1"
                required
              />
            </label>
            <p>Tipo</p>
            <div className="flex w-full max-w-xs items-center justify-evenly">
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
            </div>
            <label htmlFor="ammount">
              <p>Cantidad</p>
              <input
                type="number"
                name="ammount"
                id="ammount"
                min={1}
                className="rounded-md border-2 p-1 text-right"
                required
              />
              <span className="ml-2">g</span>
            </label>
            <label htmlFor="description">
              <p>Descripcion (opcional)</p>
              <textarea
                name="description"
                id="description"
                className="rounded-md border-2 p-1"
              />
            </label>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-md bg-cyan-600 p-4 text-xl font-bold text-gray-100"
            >
              Crear
            </button>
          </form>
        </Container>
      </main>
    </>
  );
}
