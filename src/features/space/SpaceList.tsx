import { Loader } from "../common";
import { api } from "~/utils/api";
import { Error } from "../common/Form/Error";
import { Space } from "./components/Space";

export default function SpaceList() {
  const { data: spaces, status } = api.space.getAll.useQuery();

  const renderData = () => {
    switch (status) {
      case "loading":
        return <Loader />;
      case "success":
        if (spaces)
          return (
            <ul className="flex flex-col gap-2">
              {spaces.map((space) => (
                <li key={space.id}>
                  <Space data={space} />
                </li>
              ))}
            </ul>
          );
      case "error":
      default:
        return <Error />;
    }
  };
  return (
    <div className="flex flex-col gap-2">
      {spaces && spaces.length > 0 && <h3>Tus espacios: </h3>}
      {renderData()}
    </div>
  );
}
