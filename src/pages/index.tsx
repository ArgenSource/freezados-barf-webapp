import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Container from "~/features/common/Container";
import SpaceList from "~/features/space/SpaceList";

export default function Home() {
  return (
    <>
      <Head>
        <title>Freezados BARF</title>
        <meta
          name="description"
          content="App para gestionar tiempos de freezado en dietas BARF"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen bg-zinc-900 text-violet-300">
        <AuthShowcase />
        <Container>
          <h1 className="mb-6 text-center text-6xl font-bold text-violet-300">
            Freezados BARF
          </h1>
          <SpaceList />
          <div className="mt-8 rounded-md border-2 bg-violet-600/30 p-4">
            <Link href="/create-space" target="_self">
              <h3 className="text-xl font-bold">Crear nuevo espacio</h3>
              <div className="text-base italic text-gray-300">
                Un espacio te permitira gestionar distintas ubicaciones de
                guardado como freezers y heladeras.
              </div>
            </Link>
          </div>
        </Container>
      </main>
    </>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4 ">
      <p className="text-center text-2xl">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold  no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
