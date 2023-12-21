import { type FormEvent } from "react";
import { useRouter } from "next/router";

import { BackButton } from "~/features/common/components";
import { createUbication as createSchema } from "~/utils/schemas/ubication";
import { api } from "~/utils/api";
import { PageLayout } from "~/features/common/components/layout";
import { FormInput, Textarea } from "~/features/common/components/Form";

export default function AddUbication() {
  const createUbication = api.ubication.create.useMutation();
  const router = useRouter();
  const { id: spaceId } = router.query;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!spaceId) return;
    const formData = new FormData(e.currentTarget);

    try {
      const input = createSchema.parse({
        ...Object.fromEntries(formData.entries()),
        isFreezer: formData.get("isFreezer") == "on",
        spaceId: spaceId.toString(),
      });

      createUbication
        .mutateAsync(input)
        .then(() => router.push(`/space/${spaceId.toString()}`))
        .catch((err) => console.error(err));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <PageLayout headTitle="Freezados - Add new ubication">
      <BackButton />
      <h1 className="text-center text-2xl font-bold">Crea tu ubicacion</h1>
      <form onSubmit={handleSubmit} className="mt-8 flex w-full flex-col gap-4">
        <FormInput fieldName="name" displayName="Nombre" required />
        <FormInput
          fieldName="description"
          displayName="Descripcion (opcional)"
          required
          elements={{
            input: <Textarea name="description" id="description" />,
          }}
        />
        <FormInput
          fieldName="isFreezer"
          displayName="Es un freezer?"
          required
          elements={{
            label: <></>,
            input: (
              <label className="flex gap-4">
                Es un freezer?
                <input type="checkbox" name="isFreezer" id="isFreezer" />
              </label>
            ),
          }}
        />

        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-md bg-violet-500 p-4 text-xl font-bold text-gray-100"
        >
          Crear
        </button>
      </form>
    </PageLayout>
  );
}
