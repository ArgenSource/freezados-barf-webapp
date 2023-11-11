import { type FormEvent } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import Container from "~/features/common/Container";
import { ChevronLeftCircle } from "lucide-react";

import { api } from "~/utils/api";
import { createFood } from "~/utils/schemas/food";
import { Input, FormInput, Textarea } from "~/features/common/Form";
import { SelectFoodType } from "~/features/food/components/Food/components";

import useFormErrors from "~/utils/hooks/useFormErrors";

export default function AddFood() {
  const router = useRouter();
  const { id: ubicationId } = router.query;

  const addFood = api.food.create.useMutation();

  const { errors, parseErrors } = useFormErrors(createFood);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!ubicationId) return;
    const formData = new FormData(e.currentTarget);
    formData.append("ubicationId", ubicationId.toString());
    try {
      parseErrors(Object.fromEntries(formData.entries()));
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
              errors={errors?.name}
            />
            <FormInput
              fieldName="type"
              displayName="Tipo"
              required
              errors={errors?.type}
              elements={{
                input: <SelectFoodType />,
              }}
            />
            <FormInput
              fieldName="ammount"
              displayName="Cantidad"
              errors={errors?.ammount}
              elements={{
                input: (
                  <div>
                    <Input
                      type="number"
                      name="ammount"
                      id="ammount"
                      min={1}
                      className="text-right"
                      required
                    />
                    <span className="ml-2">g</span>
                  </div>
                ),
              }}
            />
            <FormInput
              fieldName="description"
              displayName="Descripcion (opcional)"
              errors={errors?.description}
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
