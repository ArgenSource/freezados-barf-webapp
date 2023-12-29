import { type FormEvent } from "react";
import { useRouter } from "next/router";

import { api } from "~/utils/api";
import { createFood } from "~/utils/schemas/food";
import { SelectFoodType } from "~/features/food/components/Food/components";
import useFormErrors from "~/utils/hooks/useFormErrors";
import { PageLayout } from "~/features/common/components/layout";
import { BackButton, Button } from "~/features/common/components/Buttons";
import {
  FormInput,
  Input,
  Textarea,
  Datetime,
} from "~/features/common/components/Form";

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
      if (parseErrors(Object.fromEntries(formData.entries()))) {
        const input = createFood.parse(Object.fromEntries(formData.entries()));

        addFood
          .mutateAsync(input)
          .then(() => router.back())
          .catch((err) => console.error(err));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <PageLayout headTitle="Freezados - Add new food">
      <BackButton />
      <h1 className="text-center text-2xl font-bold">Add new food</h1>
      <form onSubmit={handleSubmit} className="mt-8 flex w-full flex-col gap-4">
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
            input: <Textarea name="description" id="description" />,
          }}
        />
        <FormInput
          fieldName="date"
          displayName="Fecha"
          errors={errors?.date}
          elements={{
            input: <Datetime name="date" id="date" />,
          }}
        />
        <Button type="submit" bigFont>
          Crear
        </Button>
      </form>
    </PageLayout>
  );
}
