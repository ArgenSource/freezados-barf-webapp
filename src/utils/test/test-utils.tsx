import { type RenderOptions, render } from "@testing-library/react";
import { api } from "../api";
import type { FC, PropsWithChildren, ReactElement } from "react";

const AllTheProviders: FC<PropsWithChildren> = ({ children }) => (
  <div>{children}</div>
);

const RenderHOC = api.withTRPC(AllTheProviders);

const customRender = (ui: ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: RenderHOC, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
