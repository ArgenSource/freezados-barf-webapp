import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

import { PageLayout, Container } from "~/features/common/components/layout";
import SpaceList from "~/features/space/SpaceList";

export default function Home() {
  return (
    <PageLayout headTitle="Freezados BARF">
      <AuthShowcase />
      <Container>
        <h1 className="mb-6 text-center text-6xl font-bold">Freezados BARF</h1>
        <SpaceList />
        <div className="mt-8 rounded-md bg-violet-500 p-4 text-white">
          <Link href="/create-space" target="_self">
            <h3 className="text-xl font-bold">Crear nuevo espacio</h3>
            <div className="text-base italic">
              Un espacio te permitira gestionar distintas ubicaciones de
              guardado como freezers y heladeras.
            </div>
          </Link>
        </div>
      </Container>
    </PageLayout>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4 ">
      <p className="text-end text-xl">
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
