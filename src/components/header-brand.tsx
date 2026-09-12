"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function HeaderBrand() {
  const pathname = usePathname();
  const className = "group flex shrink-0 items-center no-underline";
  const logo = (
    <Image
      src="https://simplicitymedia.com/images/simplicity-logo.webp"
      alt="Simplicity Media"
      width={272}
      height={50}
      className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105 lg:h-14"
      priority
    />
  );

  if (pathname === "/") {
    return (
      <a href="#main" className={className}>
        {logo}
      </a>
    );
  }

  return (
    <Link href="/" className={className}>
      {logo}
    </Link>
  );
}
