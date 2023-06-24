'use client';

import Image from "next/image";
import Link from "next/link";

export default function Logo({ isWhite = false }: { isWhite?: boolean }) {
  return (
    <Link href="/">
      <Image
        src={!isWhite ? "/images/logo_full.png" : "/images/logo_full_white.png"}
        height="32"
        width="167"
        alt="Logo"
        className=""
      />
    </Link>
  );
}