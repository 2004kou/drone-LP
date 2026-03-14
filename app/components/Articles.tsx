"use client";

import { useEffect, useRef, useState } from "react";
import { Element } from 'react-scroll';

const articles = [
  {
    image: null,
    title: "無料体験会の実施",
    date: "2026年3月2日",
    href: "#",
  },
  {
    image: null,
    title: "大会出場",
    date: "2026年3月2日",
    href: "#",
  },
  {
    image: null,
    title: "タイトル",
    date: "2026年3月2日",
    href: "#",
  },
];

export default function Articles() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-[#e8eef8] px-8 py-16 md:px-20">
      <Element name="articleSection">
      {/* タイトル */}
      <h2
        className={`text-3xl font-black mb-10 transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
        style={{ color: "#0d1b5e" }}
      >
        記事一覧
      </h2>

      {/* カードグリッド */}
      <div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full"
      >
        {articles.map((article, i) => (
          <a
            key={i}
            href={article.href}
            className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            {/* サムネイル */}
            <div className="w-full h-60 bg-gray-200 overflow-hidden">
              {article.image ? (
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full bg-gray-300" />
              )}
            </div>

            {/* テキスト部分 */}
            <div className="p-4">
              <p className="text-base font-bold underline mb-3 text-blue-600 group-hover:text-blue-800 transition-colors duration-200">
                {article.title}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 bg-gray-100 rounded-full px-3 py-1">
                  {article.date}
                </span>
                <img
                  src="/image/矢印ボタン　右3.png"
                  alt="詳細へ"
                  className="w-9 h-9 object-contain group-hover:translate-x-1 transition-transform duration-300"
                />
              </div>
            </div>
          </a>
        ))}
      </div>
      </Element>
    </section>
  );
}
