import { Copy } from "lucide-react";
import React from "react";

export default function PublicLink() {
  const link = "";
  const copyLinkToClipboard = () => {
    if (link !== "") {
      void navigator.clipboard.writeText(link);
    }
  };

  return (
    <div>
      {link !== "" && (
        <div className="flex items-center gap-2">
          <input
            className="rounded-md bg-slate-100 p-2 text-black"
            type="text"
            value={link}
            defaultValue={link}
          />
          <button onClick={copyLinkToClipboard}>
            <Copy />
          </button>
        </div>
      )}
    </div>
  );
}
