import { ChevronLeftCircle } from "lucide-react";
import { useRouter } from "next/router";

export const BackButton = () => {
  const router = useRouter();

  return (
    <button onClick={() => router.back()} className="mr-auto">
      <ChevronLeftCircle size={32} />
    </button>
  );
};
