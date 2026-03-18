"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from 'react-scroll';


const navItems = [
  { label: "トップ", href: "topSection" },
  { label: "ドローンサッカーとは", href: "aboutSection" },
  { label: "保護者の方へ", href: "parentsSection" },
  { label: "体験会の流れ", href: "experienceSection" },
  { label: "記事一覧", href: "articleSection" },
  { label: "アクセス・活動日時", href: "accessSection" },
  { label: "スタッフ紹介", href: "staffSection" },
  { label: "お問い合わせ", href: "contactSection" },
];
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);


  

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white`}
    >
      <div className="px-6 flex items-center justify-between h-[74px] w-full">
        {/* ロゴ */}
        <Link to="TopSection" smooth href="#top" className="flex items-center shrink-0">
          <Image
            src="/image/freiheit ロゴ.jpg"
            alt="freiheit ロゴ"
            width={80}
            height={80}
            className="object-contain max-h-[66px] w-auto"
            priority
          />
          <h1 className="ml-2 text-xl font-bold tracking-widest text-sky-600">Freiheit</h1>
        </Link>

        {/* PCナビ */}
        <nav className="hidden lg:flex items-center divide-x divide-gray-300">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="px-3 py-1 text-s text-black-700 hover:text-sky-500 transition-colors duration-200 whitespace-nowrap"
              smooth
              offset={-150}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* ハンバーガー（SP） */}
        <button
          className="lg:hidden ml-auto p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="メニュー"
        >
          <span
            className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-gray-700 mt-1.5 transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-gray-700 mt-1.5 transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* SPドロワーメニュー */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-screen bg-white shadow-lg" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col divide-y divide-gray-100">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setMenuOpen(false)}
              className="px-6 py-3 text-sm text-gray-700 hover:text-sky-500 hover:bg-sky-50 transition-colors duration-200"
              smooth
              offset={-150}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
