import { type FormEvent } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import Container from "~/components/common/Container";

import { api } from "~/utils/api";
import { createFood } from "~/utils/schemas/food";

export default function AddFood() {
  const router = useRouter();
  const { id: foodId } = router.query;

  const addFood = api.food.create.useMutation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const input = createFood.parse(Object.fromEntries(formData.entries()));
      addFood
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
        <title>Add new food</title>
      </Head>
      <main>
        <Container>
          <h1>Add new food</h1>
          <form onSubmit={handleSubmit}>
            <input type="text" id="name" name="name" required />
          </form>
        </Container>
      </main>
    </>
  );
}
