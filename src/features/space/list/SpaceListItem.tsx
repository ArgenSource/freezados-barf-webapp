import type { Space } from "@prisma/client";
import { ContainerIcon } from "lucide-react";
import Link from "next/link";

export function SpaceListItem({ data }: { data: Space }) {
  return (
    <Link
      href={`/space/${data.id}`}
      className="group flex items-center gap-2 transition-all hover:gap-1"
    >
      <ContainerIcon className="group-hover:scale-110 group-hover:text-blue-500 group-active:scale-100 group-active:text-blue-300" />
      {data.name}
    </Link>
  );
}
