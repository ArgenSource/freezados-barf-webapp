import { toast } from "sonner";

export const renderErrorToast = (err: unknown, text = "Error") => {
  toast.error(err instanceof Error ? err.message : text);
};
