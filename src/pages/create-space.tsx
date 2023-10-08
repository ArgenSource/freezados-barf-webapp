import { type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Head from "next/head";

import { api } from "~/utils/api";
import Container from '~/components/common/Container';
import { createSpace } from '~/utils/schemas/space';

export default function CreateSpace() {

    const router = useRouter();

    const create = api.space.create.useMutation();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        try {
            const { name } = createSpace.parse(Object.fromEntries(formData.entries()))
            create.mutateAsync({ name: name })
                .then(res => router.push(`space/${res.id}`))
                .catch(err => console.error(err))
        } catch(err) { 
            console.error(err)
        }

    }

    return ( 
        <>
        <Head>
            <title>Freezados - Crear espacio</title>
            <meta name="description" content="App para gestionar tiempos de freezado en dietas BARF" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
            <Container>
            <h1>Crea tu espacio</h1>
            <section>
                <form onSubmit={handleSubmit}>
                    <input type="text" id="name" name='name' />
                </form>
            </section>
            </Container>
        </main>
    </>
    );
}