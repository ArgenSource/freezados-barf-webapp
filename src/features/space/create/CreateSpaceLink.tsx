import Link from "next/link";

export const CreateSpaceLink = () => (
  <div className="mt-8 rounded-md bg-violet-500 p-4 text-white">
    <Link href="/create-space" target="_self">
      <h3 className="text-xl font-bold">Crear nuevo espacio</h3>
      <div className="text-base italic">
        Un espacio te permitira gestionar distintas ubicaciones de guardado como
        freezers y heladeras.
      </div>
    </Link>
  </div>
);
