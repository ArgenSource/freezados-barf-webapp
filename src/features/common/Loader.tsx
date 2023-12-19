import { Dot } from "lucide-react";

export function Loader({ size = 56 }: { size?: number }) {
  return (
    <div className="flex h-full w-full items-center justify-center gap-2">
      <Dot
        size={size}
        className="animate-pulse"
        style={{ animationDelay: "0.5s" }}
      />
      <Dot
        size={size}
        className="animate-pulse"
        style={{ animationDelay: "1s" }}
      />
      <Dot
        size={size}
        className="animate-pulse"
        style={{ animationDelay: "1.5s" }}
      />
    </div>
  );
}
