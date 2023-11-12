import { ContainerIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface IProps {
  spaceName: string;
  linkText?: string;
  href?: string;
}

export const SpaceHeader = ({ spaceName, linkText, href }: IProps) => (
  <>
    <div className="mb-4 flex w-full items-center justify-center gap-2 text-2xl font-bold text-gray-300">
      <ContainerIcon />
      <h1>{spaceName}</h1>
    </div>
    {linkText && href && (
      <Link
        href={href}
        className="mb-4 w-fit text-gray-400 hover:text-gray-600"
      >
        {linkText}
      </Link>
    )}
  </>
);
