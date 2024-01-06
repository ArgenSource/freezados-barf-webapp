import { type FormEvent } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";

import { api } from "~/utils/api";
import { createFood } from "~/utils/schemas/food";
import { SelectFoodType } from "~/features/food/components/Food/components";
import useFormErrors from "~/utils/hooks/useFormErrors";
import { SubmitButton } from "~/features/common/components/Buttons";
import {
  FormInput,
  Input,
  Textarea,
  Datetime,
} from "~/features/common/components/Form";
import { renderErrorToast } from "~/features/common/utils/renderErrorToast";

export const AddFoodForm = () => {
  const router = useRouter();
  const { id: ubicationId } = router.query;

  const addFood = api.food.create.useMutation();

  const { errors, parseErrors } = useFormErrors(createFood);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!ubicationId) return;
    const formData = new FormData(e.currentTarget);

    formData.append("ubicationId", ubicationId.toString());
    if (parseErrors(Object.fromEntries(formData.entries()))) {
      const input = createFood.parse(Object.fromEntries(formData.entries()));

      addFood
        .mutateAsync(input)
        .then(() => {
          addFood.reset();
          toast.success("Comida agregada correctamente");
        })
        .then(() => router.back())
        .catch((err) => renderErrorToast(err, "Error al agregar comida"));
    }
  };

  return (
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
      <SubmitButton
        status={addFood.status}
        errorMessage={addFood.error?.message}
        bigFont
      >
        Crear
      </SubmitButton>
    </form>
  );
};
