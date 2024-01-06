import { type Space as TSpace } from "@prisma/client";
import { test, expect } from "vitest";

import { render, screen } from "~/utils/test/test-utils";
import { SpaceListItem } from "./SpaceListItem";

const mockSpaceData: TSpace = {
  id: "1548451516",
  name: "Mock Space",
  ownerId: "1489412321654",
  sharedConfig: "INVITATION",
};

test("should render Space name and link to space page", () => {
  render(<SpaceListItem data={mockSpaceData} />);

  expect(screen.getByText(mockSpaceData.name)).toBeDefined();
  expect(
    screen.getByRole("link", { name: mockSpaceData.name }),
  ).toHaveAttribute("href", `/space/${mockSpaceData.id}`);
});
