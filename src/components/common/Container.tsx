import { type PropsWithChildren } from "react";

export default function Container(props: PropsWithChildren) {
  return (
    <div className="m-auto box-border flex h-full w-full flex-col p-2 sm:max-w-2xl">
      {props.children}
    </div>
  );
}
