import { render, screen } from "~/utils/test/test-utils";
import { Food } from "./Food";
import { type Food as TFood } from "@prisma/client";
import { test, expect, vi } from "vitest";

const mockFoodData: TFood = {
  id: "1",
  name: "Cornalitos",
  description: "test asd asd",
  ammount: 100,
  type: "FISH",
  ubicationId: "1",
  usedAt: null,
  storedAt: new Date(),
  freezedAt: null,
};

test("should render Food name and amount", () => {
  vi.mock("next/router", () => ({
    useRouter() {
      return {
        route: "/",
        pathname: "",
        query: { id: "" },
        asPath: "",
      };
    },
  }));
  render(<Food foodData={mockFoodData} />);
  expect(screen.getByText(/cornalitos 100g/i)).toBeDefined();
  expect(screen.getByTestId("fish-icon")).toBeDefined();
});
