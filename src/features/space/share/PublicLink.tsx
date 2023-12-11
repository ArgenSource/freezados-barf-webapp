import { Copy } from "lucide-react";
import { useRouter } from "next/router";
import React from "react";

export default function PublicLink() {
  const router = useRouter();

  const link = window.location.origin + router.asPath + "/join";
  const copyLinkToClipboard = () => {
    void navigator.clipboard.writeText(link);
  };

  return (
    <div className="flex w-full grow flex-col items-center justify-center gap-2">
      <input
        className="w-full rounded-md bg-slate-100 p-2 text-black md:w-4/5"
        type="text"
        value={link}
        defaultValue={link}
        readOnly
      />
      <button
        onClick={copyLinkToClipboard}
        className="flex items-center justify-center gap-2"
      >
        Copiar <Copy />
      </button>
    </div>
  );
}
