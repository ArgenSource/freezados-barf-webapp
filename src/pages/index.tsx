// import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Container from "~/components/common/Container";
import Loader from "~/components/common/Loader";

// import { api } from "~/utils/api";

export default function Home() {
  // const newSpace = api.space.create.useQuery({ name: "nuevo" });

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
      <main>
        <Container>
          <h1>Freezados BARF</h1>
          <div>
            <Link href="/create-space" target="_self">
              <h3 className="text-2xl font-bold">Crear nuevo espacio</h3>
              <div className="text-lg">
                Un espacio te permitira gestionar distintas ubicaciones de
                guardado como freezers y heladeras.
              </div>
            </Link>
          </div>
          {/* <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p>
            <AuthShowcase />
          </div> */}
        </Container>
      </main>
    </>
  );
}

// function AuthShowcase() {
//   const { data: sessionData } = useSession();

//   const { data: secretMessage } = api.example.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined }
//   );

//   return (
//     <div className="flex flex-col items-center justify-center gap-4">
//       <p className="text-center text-2xl text-white">
//         {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
//         {secretMessage && <span> - {secretMessage}</span>}
//       </p>
//       <button
//         className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
//         onClick={sessionData ? () => void signOut() : () => void signIn()}
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   );
// }
