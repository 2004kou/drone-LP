"use client";

import { useEffect, useRef, useState } from "react";
import { Element } from 'react-scroll';

const cards = [
  {
    title: "練習ばかりで\n楽しくない",
    image: "/image/練習ばかりで楽しくない (1).jpg",
    points: ["基礎練習ばかり", "ミーティングばかり"],
  },
  {
    title: "失敗が怖くなる",
    image: "/image/失敗が怖くなる.jpg",
    points: ["ミスをすると厳しく指導される", "やりたいようにできない"],
  },
  {
    title: "友達と一緒に\n楽しめない",
    image: "/image/友達と一緒に楽しめない.jpg",
    points: ["個人練習が中心", "レベルがバラバラ"],
  },
];

export default function WhyQuit() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="relative w-full py-16 px-6 md:px-16"
      style={{
        backgroundImage: "url('/image/他の習い事が続かない理由背景.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Element name="parentsSection">
      {/* 暗めオーバーレイ */}
      <div className="absolute inset-0 bg-black/40" />

      <div ref={ref} className="relative z-10">
        {/* タイトル */}
        <h2
          className={`text-center text-3xl md:text-4xl font-black text-white mb-12 drop-shadow-lg transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          他の習い事が続かない<br className="md:hidden" />理由
        </h2>

        {/* カード3枚 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
          {cards.map((card, i) => (
            <div
              key={i}
              className={`bg-[#FFFAFA] rounded-lg overflow-hidden shadow-lg flex flex-col transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* カードタイトル */}
              <p
                className="text-center font-black min-h-[5rem] text-xl pt-4 px-4 whitespace-pre-line md:text-xl"
                style={{ color: "#060d30" }}
              >
                {card.title}
              </p>

              {/* イラスト */}
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-contain p-2"
                />
              </div>

              {/* バツポイント */}
              <div className="px-5 pb-5 space-y-2 flex-grow">
                {card.points.map((point, j) => (
                  <div key={j} className="flex gap-2  text-gray-800  ">
                    <img
                      src="/image/細いバツのアイコン.png"
                      alt="×"
                      className="w-4 h-4 mt-0.5 flex-shrink-0 object-contain"
                    />
                    <span >{point}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      </Element>
    </section>
  );
}
