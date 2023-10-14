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
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <Head>
        <title>Add new ubication</title>
      </Head>
      <main>
        <Container>
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" id="name" required />
            <textarea name="description" id="description" />
            <label htmlFor="isFreezer">
              <p>Es un freezer?</p>
              <input type="checkbox" name="isFreezer" id="isFreezer" />
            </label>
          </form>
        </Container>
      </main>
    </>
  );
}
