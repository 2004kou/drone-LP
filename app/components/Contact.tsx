"use client";

import { useEffect, useRef, useState } from "react";
import { Element } from 'react-scroll';

export default function Contact() {
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
    <section id="contact" className="bg-[#cce8f8] px-8 py-16 md:px-20">
      <Element name="contactSection">
      <div
        ref={ref}
        className={`max-w-3xl mx-auto transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* タイトル */}
        <h2 className="text-4xl font-black mb-8" style={{ color: "#0d1b5e" }}>
          お問い合わせ
        </h2>

        {/* 電話ボックス */}
        <div className="bg-white rounded-xl px-8 py-5 flex flex-col items-center mb-8 shadow-sm">
          <p className="text-sm text-gray-600 mb-2">電話でのお問い合わせ</p>
          <a
            href="tel:080-9126-0810"
            className="flex items-center gap-3 hover:opacity-70 transition-opacity"
          >
            <img
              src="/image/電話発信中のフリーアイコン.png"
              alt="電話"
              className="w-7 h-7 object-contain"
            />
            <span className="text-3xl font-black" style={{ color: "#0d1b5e" }}>
              080-9126-0810
            </span>
          </a>
        </div>

        {/* 説明文 */}
        <p className="text-sm text-gray-700 mb-8 leading-relaxed">
          資料請求及び受講申し込みの案内を自動返信メールで送付いたします。
          <br />
          メールが届かない場合は、
          <span className="underline">迷惑メールフォルダ</span>
          もご確認ください。
        </p>

        {/* フォーム */}
        <form className="space-y-6">
          {/* お名前 */}
          <div>
            <label className="block text-base font-black mb-2" style={{ color: "#0d1b5e" }}>
              お名前 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="田中太郎（例）"
              className="w-full bg-white rounded-xl px-5 py-4 text-base placeholder-sky-300 outline-none border border-transparent focus:border-sky-400 transition-colors"
            />
          </div>

          {/* メールアドレス */}
          <div>
            <label className="block text-base font-black mb-2" style={{ color: "#0d1b5e" }}>
              メールアドレス <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="example@email.com（例）"
              className="w-full bg-white rounded-xl px-5 py-4 text-base placeholder-sky-300 outline-none border border-transparent focus:border-sky-400 transition-colors"
            />
          </div>

          {/* 電話番号 */}
          <div>
            <label className="block text-base font-black mb-2" style={{ color: "#0d1b5e" }}>
              電話番号
            </label>
            <input
              type="tel"
              placeholder="080-0000-0000（例）"
              className="w-full bg-white rounded-xl px-5 py-4 text-base placeholder-sky-300 outline-none border border-transparent focus:border-sky-400 transition-colors"
            />
          </div>

          {/* お子様の学年 */}
          <div>
            <label className="block text-base font-black mb-2" style={{ color: "#0d1b5e" }}>
              お子様の学年 <span className="text-red-500">*</span>
            </label>
            <select
              required
              className="w-full bg-white rounded-xl px-5 py-4 text-base text-gray-500 outline-none border border-transparent focus:border-sky-400 transition-colors appearance-none"
            >
              <option value="" disabled selected>選択してください</option>
              <option value="elementary1">小学1年生</option>
              <option value="elementary2">小学2年生</option>
              <option value="elementary3">小学3年生</option>
              <option value="elementary4">小学4年生</option>
              <option value="elementary5">小学5年生</option>
              <option value="elementary6">小学6年生</option>
              <option value="middle1">中学1年生</option>
              <option value="middle2">中学2年生</option>
              <option value="middle3">中学3年生</option>
            </select>
          </div>

          {/* その他自由記述欄 */}
          <div>
            <label className="block text-base font-black mb-2" style={{ color: "#0d1b5e" }}>
              その他自由記述欄 <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              placeholder="練習日程を教えてください。（例）"
              rows={4}
              className="w-full bg-white rounded-xl px-5 py-4 text-base placeholder-sky-300 outline-none border border-transparent focus:border-sky-400 transition-colors resize-none"
            />
          </div>

          {/* 送信ボタン */}
          <div className="flex justify-center pt-2">
            <button
              type="submit"
              className="group flex items-center justify-between gap-8 bg-sky-400 hover:bg-sky-500 text-white text-xl font-bold rounded-xl px-8 md:px-12 py-4 transition-colors duration-300 w-full max-w-[360px]"
            >
              <span>送信する</span>
              <img
                src="/image/矢印アイコン　右1.png"
                alt="送信"
                className="w-9 h-9 object-contain group-hover:translate-x-1 transition-transform duration-300"
              />
            </button>
          </div>
        </form>

        {/* LINE */}
        <div className="mt-10 text-center space-y-4">
          <p className="text-sm text-gray-600">なんでもお気軽にご相談ください</p>
          <a
            href="https://lin.ee/dztuRWM"
            className="group inline-flex items-center justify-between gap-4 md:gap-8 bg-green-500 hover:bg-green-600 text-white text-sm md:text-lg font-bold rounded-full px-6 md:px-12 py-4 transition-colors duration-300"
          >
            <span className="whitespace-nowrap">LINEでのお問い合わせはこちら</span>
            <img
              src="/image/右矢印アイコン　白.png"
              alt="→"
              className="w-7 h-7 object-contain group-hover:translate-x-1 transition-transform duration-300"
            />
          </a>
        </div>
      </div>
      </Element>
    </section>
  );
}
