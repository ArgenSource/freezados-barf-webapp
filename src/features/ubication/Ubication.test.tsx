import { test, expect } from "vitest";
import Ubication from "./Ubication";
import { type Ubication as TUbication } from "@prisma/client";
import { render, screen } from "~/utils/test/test-utils";
import { debug } from "vitest-preview";

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
  debug();
});
