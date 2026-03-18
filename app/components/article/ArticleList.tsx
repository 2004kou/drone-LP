"use client"

import { useEffect, useRef, useState } from "react";
import { Element } from 'react-scroll';
import { Post } from "@/app/types/types";
import Link from "next/link";

interface postProps {
    articles:Post[];
}


export default  function Articles({articles}:postProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const [ currentPage, setCurrentPage ] = useState(1)
  const postsPerPage = 6
  const displayArticles = articles.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  )

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="articles" className="bg-[#e8eef8] px-8 py-16 md:px-20">
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
        {displayArticles.map((article, i) => (
          <Link
            href={`/posts/${article.id}`}
            key={article.id}
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
              <p className="text-base text-xl font-bold underline mb-3 text-blue-600 group-hover:text-blue-800 transition-colors duration-200">
                {article.title}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-600 bg-gray-100 rounded-full px-3 py-1">
                  {new Date(article.createdAt).toLocaleDateString("ja-JP",{
                    year:"numeric",
                    month:"long",
                    day:"numeric"
                  })}
                </span>
                <img
                  src="/image/矢印ボタン　右3.png"
                  alt="詳細へ"
                  className="w-9 h-9 object-contain group-hover:translate-x-1 transition-transform duration-300"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
      {/* ページネーション */}
      <div className="flex justify-center gap-2 mt-10">
        {Array.from({ length: Math.ceil(articles.length / postsPerPage) }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-10 h-10 rounded-full font-bold transition-colors ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      </Element>
    </section>
  );
}
