import { describe, test, expect, vi } from "vitest";

import { fireEvent, render, screen } from "~/utils/test/test-utils";
import QueryErrorBoundary from "./QueryErrorBoundary";

describe("Query Error Boundary", () => {
  test("should render default error page and have refetch button", () => {
    const mockError = {
      code: "BAD_REQUEST",
      httpStatus: 500,
      zodError: null,
    } as const;

    const MockChildren = () => <div id="children">test</div>;
    const refetchMock = vi.fn(
      async () => new Promise((resolve) => resolve(null)),
    );

    render(
      <QueryErrorBoundary error={mockError} refetch={refetchMock}>
        <MockChildren />
      </QueryErrorBoundary>,
    );

    expect(screen.getByText(mockError.code)).toBeDefined();

    const btn = screen.getByRole("button", { name: "Probar de nuevo" });

    expect(btn).toBeDefined();

    fireEvent.click(btn);

    expect(refetchMock).toHaveBeenCalled();
  });

  test("should render Auth Error component", () => {
    const mockError = {
      code: "UNAUTHORIZED",
      httpStatus: 409,
      zodError: null,
    } as const;
    const refetchMock = vi.fn(
      async () => new Promise((resolve) => resolve(null)),
    );

    render(<QueryErrorBoundary error={mockError} refetch={refetchMock} />);

    expect(
      screen.getByText("No estas autorizado a acceder a esta pagina"),
    ).toBeDefined();
    expect(
      screen.getByRole("link", { name: "O vuelve al inicio" }),
    ).toHaveAttribute("href", "/");
  });
});
