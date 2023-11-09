import { type FormEvent } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import Container from "~/features/common/Container";
import { ChevronLeftCircle } from "lucide-react";

import { api } from "~/utils/api";
import { createFood } from "~/utils/schemas/food";
import SelectType from "~/features/food/components/Food/components/SelectType";
import { Input, FormInput, Textarea } from "~/features/common/Form";

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
            <FormInput
              fieldName="name"
              displayName="Nombre"
              required
              error={undefined}
            />
            {/* <label htmlFor="name">
              <p>Nombre</p>
              <Input type="text" id="name" name="name" required />
              <Error />
            </label> */}
            <p>Tipo</p>
            <SelectType />
            <FormInput
              fieldName="ammount"
              displayName="Cantidad"
              error={undefined}
              elements={{
                input: (
                  <div>
                    <Input
                      type="number"
                      name="ammount"
                      id="ammount"
                      min={1}
                      className="text-right after:content-['g']"
                      required
                    />
                    <span className="ml-2">g</span>
                  </div>
                ),
              }}
            />
            {/* <label htmlFor="ammount">
              <p>Cantidad</p>
              <Input
                type="number"
                name="ammount"
                id="ammount"
                min={1}
                className="text-right"
                required
              />
              <span className="ml-2">g</span>
            </label> */}
            <FormInput
              fieldName="description"
              displayName="Descripcion (opcional)"
              error={undefined}
              elements={{
                input: (
                  <Textarea
                    name="description"
                    id="description"
                    className="rounded-md border-2 p-1"
                  />
                ),
              }}
            />
            {/* <label htmlFor="description">
              <p>Descripcion (opcional)</p>
              <textarea
                name="description"
                id="description"
                className="rounded-md border-2 p-1"
              />
            </label> */}
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
