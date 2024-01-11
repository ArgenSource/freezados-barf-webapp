import Link from "next/link";
import React from "react";

interface Props {
  spaceId: string | undefined;
}

export const EmptyUbications = ({ spaceId }: Props) => (
  <div className="mt-8 flex flex-col items-center gap-6">
    <h2 className="text-center text-xl font-bold text-gray-600">
      No tienes ubicaciones registradas
    </h2>
    <Link
      href={`/space/${spaceId?.toString()}/add-ubication`}
      className="w-fit rounded-md bg-cyan-600 p-4 text-xl font-bold text-gray-100"
    >
      <h3>Crea la primera</h3>
    </Link>
  </div>
);
