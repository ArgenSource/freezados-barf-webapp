import { useState,
    type ChangeEvent,
    type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Head from "next/head";

import { api } from "~/utils/api";

export default function CreateSpace() {

    const router = useRouter();

    const create = api.space.create.useMutation();
    const [name, setName] = useState<string>();

    const handleNameInput = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (name !== undefined) {
            create.mutateAsync({ name: name })
                .then(res => router.push(res.id))
                .catch(err => console.error(err))
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
            <h1></h1>
            <section>
                <form onSubmit={handleSubmit}>
                    <input type="text" id="name" name='name' value={name} onChange={handleNameInput} />
                </form>
            </section>
        </main>
    </>
    );
}