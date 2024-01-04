import { toast } from "sonner";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const renderErrorToast = (err: any, text: string) => {
  toast.error(err instanceof Error ? err.message : text);
};
