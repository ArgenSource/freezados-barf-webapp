import { render } from "@testing-library/react";
import { test } from "vitest";
import Ubication from "./Ubication";
import { type Ubication as TUbication } from "@prisma/client";

const mockUbication: TUbication = {
  id: "string",
  name: "string",
  description: "string",
  spaceId: "string",
  isFreezer: false,
};

test("Ubication component", () => {
  render(<Ubication data={mockUbication} />);
});
