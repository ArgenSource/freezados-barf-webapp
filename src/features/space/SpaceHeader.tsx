import { ContainerIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export const SpaceHeader = ({ spaceName }: { spaceName: string }) => (
  <>
    <div className="mb-4 flex w-full items-center justify-center gap-2 text-2xl font-bold text-gray-300">
      <ContainerIcon />
      <h1>{spaceName}</h1>
    </div>
    <Link href="/" className="mb-4 w-fit text-gray-400 hover:text-gray-600">
      Volver al listado de espacios
    </Link>
  </>
);
