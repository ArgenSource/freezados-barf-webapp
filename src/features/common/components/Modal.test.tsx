import { expect, describe, test, vi, beforeEach } from "vitest";

import { Modal } from "./Modal";
import { render, screen, cleanup, fireEvent } from "~/utils/test/test-utils";

describe("Modal component", () => {
  beforeEach(() => {
    cleanup();
  });

  test("should render modal when open & not when closed", () => {
    render(<Modal open={true} data-testid="modal" />);
    const modal = screen.queryByTestId("modal");

    expect(modal).toBeDefined();

    cleanup();
    render(<Modal open={false} data-testid="modal" />);

    expect(modal).not.toBeInTheDocument();
  });

  test("should render custom styles", () => {
    render(<Modal open={true} className="text-red-500" data-testid="modal" />);

    expect(screen.getByTestId("modal")).toHaveClass("text-red-500");
  });

  test("should fire onClickOutside function", () => {
    const clickOutside = vi.fn();

    render(
      <Modal
        open={true}
        onClickOutside={clickOutside}
        className="h-0 w-0"
        data-testid="modal"
      />,
    );

    expect(screen.getByTestId("modal")).toBeDefined();

    fireEvent.pointerDown(document);

    expect(clickOutside).toHaveBeenCalledOnce();
  });
});
