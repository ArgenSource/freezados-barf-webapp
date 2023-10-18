import { type FormEvent } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import Container from "~/components/common/Container";

import { createUbication as createSchema } from "~/utils/schemas/ubication";
import { api } from "~/utils/api";

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
        .then((res) => router.push(`/space/${spaceId.toString()}`))
        .catch((err) => console.error(err));
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <Head>
        <title>Freezados - Add new ubication</title>
      </Head>
      <main>
        <Container>
          <h1 className="text-center text-2xl font-bold">Crea tu ubicacion</h1>
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex w-full flex-col items-center gap-4"
          >
            <label htmlFor="name">
              <p>Nombre</p>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="rounded-md border-2 p-1"
              />
            </label>
            <label htmlFor="description">
              <p>Descripcion (opcional)</p>
              <textarea
                name="description"
                id="description"
                className="rounded-md border-2 p-1"
              />
            </label>
            <label htmlFor="isFreezer" className="justify-apart flex gap-4">
              <p>Es un freezer?</p>
              <input type="checkbox" name="isFreezer" id="isFreezer" />
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
