import { signIn } from "next-auth/react";
import Link from "next/link";

export default function AuthError() {
  return (
    <div>
      <h2>No estas autorizado a acceder a esta pagina</h2>
      <button onClick={() => void signIn()}>Inicia sesion</button>
      <Link href="/">O vuelve al inicio</Link>
    </div>
  );
}
