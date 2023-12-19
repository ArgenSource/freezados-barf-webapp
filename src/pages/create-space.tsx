import { type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { Container as ContainerIcon } from "lucide-react";

import { api } from "~/utils/api";
import { Container } from "~/features/common";
import { createSpace } from "~/utils/schemas/space";

export default function CreateSpace() {
  const router = useRouter();

  const create = api.space.create.useMutation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const { name } = createSpace.parse(
        Object.fromEntries(formData.entries()),
      );
      create
        .mutateAsync({ name: name })
        .then((res) => router.push(`space/${res.id}`))
        .catch((err) => console.error(err));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Head>
        <title>Freezados - Crear espacio</title>
        <meta
          name="description"
          content="App para gestionar tiempos de freezado en dietas BARF"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container>
          <h1 className="text-center text-2xl">Crea tu espacio</h1>
          <section className="mt-8 w-full">
            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-col items-center gap-4"
            >
              <label htmlFor="name">
                <p>Nombre: </p>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="rounded-md border-2 p-1"
                  autoComplete="none"
                />
              </label>
              <button
                type="submit"
                className="flex items-center gap-2 rounded-md bg-cyan-600 p-4 text-xl font-bold text-gray-100"
              >
                Crear <ContainerIcon />
              </button>
            </form>
          </section>
        </Container>
      </main>
    </>
  );
}
