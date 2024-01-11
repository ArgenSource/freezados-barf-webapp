import { test, expect } from "vitest";
import { type Ubication as TUbication } from "@prisma/client";

import { Ubication } from "./Ubication";
import { render, screen } from "~/utils/test/test-utils";

const mockUbication: TUbication = {
  id: "string",
  name: "Ubication Test",
  description: "string",
  spaceId: "string",
  isFreezer: false,
};

test("should render the ubication name", () => {
  render(<Ubication data={mockUbication} />);

  expect(screen.getByText("Ubication Test")).toBeDefined();
});
