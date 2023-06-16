'use client';

import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <Image
        src="/images/logo_full.png"
        height="32"
        width="167"
        alt="Logo"
      />
    </Link>
  );
}