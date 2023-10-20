import Link from "next/link";
import { Container as ContainerIcon } from "lucide-react";

import { Space } from "@prisma/client";
import Loader from "../common/Loader";

import { api } from "~/utils/api";

export default function SpaceList() {
  const { data: spaces, status } = api.space.getAll.useQuery();

  const renderData = () => {
    switch (status) {
      case "loading":
        return <Loader />;
      case "success":
        if (spaces)
          return (
            <ul>
              {spaces.map((space) => (
                <li key={space.id}>
                  <Space data={space} />
                </li>
              ))}
            </ul>
          );
      case "error":
      default:
        return <h6>Oops</h6>;
    }
  };
  return (
    <div>
      {spaces && spaces.length > 0 && <h3>Tus espacios: </h3>}
      {renderData()}
    </div>
  );
}

function Space({ data }: { data: Space }) {
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
