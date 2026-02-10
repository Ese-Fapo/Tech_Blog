import Link from "next/link";
import React from "react";

interface BackLinkProps {
  href?: string;
  label?: string;
  className?: string;
}

export default function BackLink({
  href = "https://my-website-beta-lovat.vercel.app/",
  label = "Voltar para o site",
  className = "",
}: BackLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 ${className}`}
      aria-label={label}
    >
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 18l-6-6 6-6" />
      </svg>
      <span className="font-medium">{label}</span>
    </Link>
  );
}
