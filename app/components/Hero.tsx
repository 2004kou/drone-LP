"use client";

import { useEffect, useRef, useState } from "react";
import { Element } from 'react-scroll';

export default function Hero() {
  const textRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="topSection" className="flex flex-col mt-[74px]">
      <Element name="topSection">
      {/* 動画背景エリア */}
      <div className="relative w-full h-[80vh] overflow-hidden bg-gray-900">
        <video
          className="absolute inset-10 w-full h-full object-cover scale-[1.35]"
          src="/video/ドローン動画　最終版.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        {/* 暗めのオーバーレイ */}
        <div className="absolute inset-0 bg-black/30" />

        {/* キャッチコピー */}
        <div
          ref={textRef}
          className={`absolute bottom-12 left-10 transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-white font-black text-5xl md:text-6xl leading-tight teachers-h1 drop-shadow-[0_4px_16px_rgba(0,0,0,1)]"
          >
            空で戦う
            <br />
            新しい部活動
          </p>
        </div>
      </div>

      {/* CTAエリア */}
      <div className="bg-slate-100 flex items-center justify-center py-16">
        <a
          href="https://lin.ee/dztuRWM"
          className="group flex items-center bg-sky-500 justify-between gap-4 md:gap-6 rounded-full px-6 md:px-11 py-4 text-white text-sm md:text-lg font-medium hover:bg-sky-400 hover:text-white transition-all duration-300"
        >
          <span className="whitespace-nowrap">無料体験の申し込みはこちら</span>
          <img
            src="/image/右矢印アイコン　白.png"
            alt="arrow"
            className="w-8 h-8 object-contain transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </a>
      </div>
      </Element>
    </section>
  );
}
