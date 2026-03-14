"use client";

import Image from "next/image";
import { Link } from "react-scroll";

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

export default function Footer() {
  return (
    <footer className="bg-blue-500 text-white">
      <div className="px-8 py-12 md:px-20">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          {/* ロゴ・説明 */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/image/freiheit ロゴ.jpg"
                alt="freiheit ロゴ"
                width={50}
                height={50}
                className="object-contain rounded"
              />
              <span className="text-xl font-black tracking-widest text-white">
                freiheit
              </span>
            </div>
            <p className="text-sm text-white max-w-xs leading-relaxed">
              空で戦う、新しい部活動。<br />
              ドローンサッカーを通じて、子どもたちの<br />
              可能性を広げます。
            </p>
          </div>

          {/* ナビゲーション */}
          <nav className="grid grid-cols-2 gap-x-12 gap-y-3">
            {navItems.map((item) => (
              <Link
                to={item.href}
                key={item.href}
                className="text-sm text-white hover:text-sky-300 transition-colors duration-200 whitespace-nowrap"
                offset={-150}
                smooth
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* お問い合わせ情報 */}
          <div className="flex flex-col gap-3 text-sm text-white">
            <p className="font-bold text-white">お問い合わせ</p>
            <p>☎ 080-9126-0810</p>
            <p>
              〒671-1116<br />
              兵庫県姫路市広畑区正門通1丁目7番地3<br />
              広畑市民センター 2F
            </p>
            <p>活動日時：毎週日曜日</p>
          </div>
        </div>
      </div>

      {/* コピーライト */}
      <div className="border-t border-white/10 px-8 py-4 text-center text-xs text-white">
        © {new Date().getFullYear()} freiheit. All rights reserved.
      </div>
    </footer>
  );
}
