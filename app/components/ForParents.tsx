"use client";

import { useEffect, useRef, useState } from "react";
import { Element } from 'react-scroll';

const abilities = [
  {
    image: "/image/考える力.jpg",
    title: "考える力",
    description: "役割分担・戦略・状況判断が必要な競技です。自ら考え、判断する力を養います。",
  },
  {
    image: "/image/コミュニケーション.jpg",
    title: "コミュニケーション力",
    description: "声を掛け合いながら試合を進めます。チームでの意思疎通を重視します。",
  },
  {
    image: "/image/失敗から考える.jpg",
    title: "失敗から学ぶ力",
    description: "ミスも経験の一つ。なぜ失敗したのかを振り返り、次へ活かす力を育てます。",
  },
];

const safetyItems = [
  "競技前には必ずルール確認を行い、安全を最優先に活動しています。",
  "機体は球状フレームに覆われた専用ドローンボールを使用しています。",
  "練習、試合中は指導者が常に状況を確認し、適切に指導します。",
  "天候の影響を受けない屋内施設で、安全に配慮しながら実施しています。",
];

function useVisible(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export default function ForParents() {
  const title = useVisible(0.2);
  const cards = useVisible(0.15);
  const safety = useVisible(0.15);

  return (
    <section id="parents" className="bg-[#e8eef8] px-8 py-16 md:px-20">
      <Element name="parentsSection">
      {/* タイトル */}
      <div
        ref={title.ref}
        className={`text-center mb-10 transition-all duration-700 ${
          title.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <h2 className="text-4xl font-black mb-4" style={{ color: "#0d1b5e" }}>
          保護者の方へ
        </h2>
        <p className="text-2xl font-bold" style={{ color: "#0d1b5e" }}>
          ３つの資質・能力を育みます
        </p>
      </div>

      {/* 3枚カード */}
      <div
        ref={cards.ref}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-14"
      >
        {abilities.map((item, i) => (
          <div
            key={i}
            className={`bg-white rounded-2xl p-5 shadow-sm transition-all duration-700 ${
              cards.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            <div className="w-full h-36 mb-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-lg font-black mb-2 text-blue-500">{item.title}</p>
            <p className="text-xs leading-relaxed text-gray-700">{item.description}</p>
          </div>
        ))}
      </div>

      {/* 安全について */}
      <div
        ref={safety.ref}
        className={`max-w-2xl mx-auto transition-all duration-700 ${
          safety.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* タイトル行：線がボックスと同幅で左右に伸びる */}
        <div className="relative flex items-center justify-center mb-0">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-black" />
          <h3
            className="relative z-10 bg-[#e8eef8] px-5 text-xl font-bold whitespace-nowrap"
            style={{ color: "#0d1b5e" }}
          >
            安全について
          </h3>
        </div>

        {/* 白いボックス */}
        <div className="mt-10  ">
          <ul className="space-y-6 w-fit mx-auto">
            {safetyItems.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-4 leading-relaxed text-gray-800"
              >
                <span className="mt-[6px] text-gray-600 text-lg leading-none flex-shrink-0">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      </Element>
    </section>
  );
}
