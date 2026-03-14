"use client";

import { useEffect, useRef, useState } from "react";
import { Element } from 'react-scroll';

const steps = [
  {
    number: "01",
    icon: "/image/愛アイコン1.png",
    title: "挨拶・流れの説明",
    description: "コーチの挨拶から入り、体験会全体の流れと安全に関する注意事項を分かりやすく説明します。",
  },
  {
    number: "02",
    icon: "/image/非常口のあの人のアイコン.png",
    title: "ウォーミングアップ",
    description: "簡単なストレッチと指の運動で体をほぐします。リラックスした状態でドローン操縦に臨めるよう準備します。",
  },
  {
    number: "03",
    icon: "/image/コントローラーアイコン2.png",
    title: "基本操縦練習",
    description: "コントローラーの使い方から始め、離陸・着陸・ホバリングなど、ドローン操縦の基本動作を一つずつ丁寧に練習します。",
  },
  {
    number: "04",
    icon: "/image/人物アイコン　チーム.png",
    title: "チームミーティング",
    description: "参加者同士でチームを組み、ミニゲームの作戦を立てます。コミュニケーションを楽しみながら戦略を練りましょう。",
  },
  {
    number: "05",
    icon: "/image/トロフィーのアイコン無料素材 その6.png",
    title: "ミニゲーム",
    description: "チーム対抗で楽しいゲームに挑戦！学んだ技術を活かして、仲間と協力しながらゴールを目指します。",
  },
  {
    number: "06",
    icon: "/image/チェックボックスアイコン.png",
    title: "まとめ・振り返り",
    description: "体験会全体を振り返り、学んだことを確認します。質問タイムもありますので、気になることは何でもお聞きください。",
  },
];

function useVisible(threshold = 0.15) {
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

export default function Experience() {
  const title = useVisible(0.2);
  const grid = useVisible(0.1);
  const info = useVisible(0.1);

  return (
    <section id="experience" className="bg-[#e8eef8] px-8 py-16 md:px-20">
      <Element name="experienceSection">
      {/* タイトル */}
      <div
        ref={title.ref}
        className={`text-center mb-10 transition-all duration-700 ${
          title.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <h2 className="text-4xl font-black" style={{ color: "#0d1b5e" }}>
          体験会の流れ
        </h2>
      </div>

      {/* 6ステップ グリッド */}
      <div
        ref={grid.ref}
        className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto mb-16"
      >
        {steps.map((step, i) => (
          <div
            key={i}
            className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition-all duration-700 ${
              grid.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            {/* 番号＋アイコン */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-full bg-sky-200 flex items-center justify-center flex-shrink-0">
                <span className="text-xl font-black text-blue-600">{step.number}</span>
              </div>
              <img
                src={step.icon}
                alt={step.title}
                className="w-10 h-10 object-contain"
              />
            </div>
            {/* タイトル */}
            <p className="text-xl font-black mb-3" style={{ color: "#0d1b5e" }}>
              {step.title}
            </p>
            {/* 説明 */}
            <p className="text-sm leading-relaxed text-gray-700">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      {/* 持ち物・対象 */}
      <div
        ref={info.ref}
        className={`max-w-4xl mx-auto space-y-8 transition-all duration-700 ${
          info.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* 持ち物 */}
        <div>
          <h3 className="text-3xl font-black mb-3" style={{ color: "#08113d" }}>
            持ち物
          </h3>
          <ul className="space-y-1 text-base text-gray-700 ">
            <li className="flex items-center gap-2 text-xl">
              <span>•</span>
              <span>自身の飲み物</span>
            </li>
            <li className="flex items-center gap-2">
              <span>•</span>
              <span className="text-xl">室内履き（必要であれば）</span><span className="text-s">※スリッパの貸し出しはできます</span>
            </li>
          </ul>
        </div>

        {/* 対象 */}
        <div>
          <h3 className="text-3xl font-black mb-3" style={{ color: "#08113d" }}>
            対象
          </h3>
          <p className="text-base text-gray-800 mb-1 text-xl">小学生・中学生</p>
          <p className="text-base font-bold text-red-500 text-xl">初心者大歓迎</p>
        </div>

        {/* CTAエリア */}
      <div className=" flex items-center justify-center py-16">
        <a
          href="https://lin.ee/dztuRWM"
          className="group flex items-center bg-sky-500 justify-between gap-4 md:gap-6 rounded-full px-6 md:px-10 py-4 text-white text-sm md:text-lg font-medium hover:bg-sky-400 hover:text-white transition-all duration-300"
        >
          <span className="whitespace-nowrap">無料体験の申し込みはこちら</span>
          <img
            src="/image/右矢印アイコン　白.png"
            alt="arrow"
            className="w-8 h-8 object-contain transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </a>
      </div>
      </div>
      </Element>
    </section>
  );
}
