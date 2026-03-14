"use client";

import { useEffect, useRef, useState } from "react";

const reasons = [
  {
    number: "01",
    title: "ゲーム感覚で楽しめるチームスポーツ",
    description:
      "ドローンサッカーは「5対5」で戦うチームスポーツ。\n基礎練習だけで終わるのではなく、実際のゲーム形式の練習を多く取り入れているため、楽しみながら自然と操縦技術が身につきます。",
  },
  {
    number: "02",
    title: "仲間と一緒にプレーできるチーム練習",
    description:
      "ドローンを一人で飛ばすだけではなく、チームで戦うスポーツだから友達と一緒に楽しめます。\n作戦を考えたり、声を掛け合いながらプレーすることで、協力する楽しさも体験できます。",
  },
  {
    number: "03",
    title: "失敗しても大丈夫！挑戦を応援する環境",
    description:
      "ドローンサッカーは何度も挑戦して上達するスポーツです。\nミスを責める指導ではなく、「どうすれば上手くいくか」を一緒に考える指導を大切にしています。",
  },
  {
    number: "04",
    title: "試合中心のアクティブな練習",
    description:
      "練習だけ・ミーティングだけで終わることはありません。\n実際の試合形式のプレーを多く取り入れ、楽しみながら実践力を高めます。",
  },
  {
    number: "05",
    title: "自由にチャレンジできるプレースタイル",
    description:
      "「こうしないとダメ」という型に縛られるのではなく、それぞれのプレースタイルを大切にしながらチャレンジできる環境です。",
  },
];

function ReasonItem({ reason, index }: { reason: typeof reasons[0]; index: number }) {
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
    
    <div
      ref={ref}
      className={`flex flex-col md:flex-row gap-6 transition-all duration-700 ${
        visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* 画像プレースホルダー */}
      <div className="flex-shrink-0 w-full md:w-70 h-48 md:h-50 bg-gray-300 rounded-md" />

      {/* テキスト */}
      <div className="flex flex-col justify-center">
        <div className="flex items-baseline gap-3 mb-2">
          <span className="text-3xl font-black text-blue-500">{reason.number}</span>
          <span className="text-lg font-bold" style={{ color: "#0d1b5e" }}>
            {reason.title}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-line">
          {reason.description}
        </p>
      </div>
    </div>
  );
}

export default function WhyFreiheit() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTitleVisible(true); },
      { threshold: 0.2 }
    );
    if (titleRef.current) observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-slate-100 px-8 py-16 md:px-20">
      <h2
        ref={titleRef}
        className={`text-center text-3xl md:text-4xl font-black mb-12 transition-all duration-700 ${
          titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
        style={{ color: "#0d1b5e" }}
      >
        Freiheitが選ばれる理由
      </h2>

      <div className="max-w-3xl mx-auto space-y-10">
        {reasons.map((reason, i) => (
          <ReasonItem key={i} reason={reason} index={i} />
        ))}
      </div>
    </section>
  );
}
