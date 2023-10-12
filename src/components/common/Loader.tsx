import { Dot } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex h-full w-full items-center justify-center gap-2">
      <Dot
        size={56}
        className="animate-pulse"
        style={{ animationDelay: "0.5s" }}
      />
      <Dot
        size={56}
        className="animate-pulse"
        style={{ animationDelay: "1s" }}
      />
      <Dot
        size={56}
        className="animate-pulse"
        style={{ animationDelay: "1.5s" }}
      />
    </div>
  );
}
