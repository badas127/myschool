"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "홈", emoji: "🏡" },
  { href: "/school-life", label: "학교생활", emoji: "🌿" },
  { href: "/guestbook", label: "방명록", emoji: "💌" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-[#e6dfd5] bg-[#faf7f2]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-4xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4">
        <Link
          href="/"
          className="flex items-center gap-3 self-start rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2e5a44]"
        >
          <div className="relative h-10 w-28 shrink-0 overflow-hidden rounded-lg border border-[#e6dfd5] bg-white p-1">
            <Image
              src="/logo.jpg"
              alt="샬롬자유학교 로고"
              fill
              sizes="112px"
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-extrabold tracking-tight text-[#2e5a44] sm:text-xl">
              샬롬자유학교
            </span>
            <span className="text-xs font-medium text-[#6b5e54]">
              샬롬~ 1년의 배움 여정을 안내합니다
            </span>
          </div>
        </Link>

        <nav aria-label="주요 메뉴" className="w-full sm:w-auto">
          <ul className="grid grid-cols-3 gap-1.5 rounded-2xl bg-[#efe9df] p-1 sm:flex sm:items-center sm:gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-sm font-bold transition-all sm:px-4 ${
                      isActive
                        ? "bg-[#2e5a44] text-white shadow-sm"
                        : "text-[#4a4039] hover:bg-white/70 hover:text-[#2e5a44]"
                    }`}
                  >
                    <span aria-hidden="true">{item.emoji}</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
