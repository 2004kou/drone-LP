"use client";

import { useEffect, useRef, useState } from "react";
import { Element } from 'react-scroll';

export default function DroneSoccer() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="aboutSection" className="  bg-slate-100 px-10 py-16 md:pl-60">
      <Element name="aboutSection">
      <div
        ref={ref}
        className={`max-w-3xl transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* タイトル */}
        <h2
          className="text-4xl font-black text-navy-900 mb-8"
          style={{ color: "#0d1b5e" }}
        >
          ドローンサッカーとは
        </h2>

        {/* 本文 */}
        <div className="space-y-6 text-base leading-relaxed" style={{ color: "#0d1b5e" }}>
          <p>ドローンサッカー®とは、韓国発祥の新しいチームスポーツです。</p>
          <p>
            球状のプラスチックフレームに覆われた専用のドローンボールを操縦し、5対5で戦います。
            <br />
            専用ケージ内のフィールドで、空中に設置されたリング状のゴールを通過させることで得点を競います。
          </p>
          <p>
            仲間と役割を分担し、戦略を立て、声を掛け合いながら戦う、技術とチームワークが求められる、最新の
            戦略型スポーツです。
          </p>
          <p>
            空間を使って戦う、まったく新しい部活動。
            <br />
            それが、ドローンサッカー®です。
          </p>
        </div>

        {/* READ MORE */}
        <div className="mt-12">
          <a
            href="https://japan-dronesoccer.com/about/"
            className="group inline-flex items-center gap-3 font-black italic text-xl text-gray-900 hover:opacity-70 transition-opacity duration-300"
          >
            <span>READ MORE</span>
            <img
              src="/image/矢印アイコン　青.png"
              alt="arrow"
              className="w-6 h-6 object-contain transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
      </Element>
    </section>
  );
}
