import { ChevronLeftCircle } from "lucide-react";
import { useRouter } from "next/router";
import { type PropsWithChildren } from "react";

export const BackButton = ({ children }: PropsWithChildren) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="mr-auto flex items-center gap-2"
    >
      <ChevronLeftCircle size={32} />
      {children}
    </button>
  );
};
