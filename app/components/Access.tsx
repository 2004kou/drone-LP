"use client";

import { useEffect, useRef, useState } from "react";
import { Element } from 'react-scroll';

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

export default function Access() {
  const { ref: titleRef, visible: titleVisible } = useVisible(0.2);
  const { ref: mapRef, visible: mapVisible } = useVisible(0.1);
  const { ref: scheduleRef, visible: scheduleVisible } = useVisible(0.1);

  return (
    <section id="access" className="bg-[#e8eef8] px-8 py-16 md:px-20">
      <Element name="accessSection">
      {/* タイトル */}
      <div
        ref={titleRef}
        className={`mb-8 transition-all duration-700 ${
          titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <h2 className="text-4xl font-black" style={{ color: "#0d1b5e" }}>
          アクセス・活動日時
        </h2>
      </div>

      {/* Googleマップ */}
      <div
        ref={mapRef}
        className={`mb-10 transition-all duration-700 ${
          mapVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="w-full rounded-xl overflow-hidden" style={{ height: "400px" }}>
          {/* ↓ Google Maps embed src をここに入れてください */}
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3276.0317573840935!2d134.62589817620199!3d34.805142877601!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3554e15447026ae7%3A0x66fdf8d099c8dba4!2z5bqD55WR5biC5rCR44K744Oz44K_44O8!5e0!3m2!1sja!2sjp!4v1773409673501!5m2!1sja!2sjp" width="1600" height="900" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>

        {/* 住所 */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-xl font-bold" style={{ color: "#0d1b5e" }}>
            広畑市民センター　2F
          </p>
          <p className="text-base text-gray-700">
            住所　：　〒671-1116 兵庫県姫路市広畑区正門通1丁目7番地3
          </p>
        </div>
      </div>

      {/* 活動日時 */}
      <div
        ref={scheduleRef}
        className={`mt-14 transition-all duration-700 ${
          scheduleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <h3 className="text-3xl font-black mb-10 ml-4 md:ml-16" style={{ color: "#0d1b5e" }}>
          活動日時
        </h3>
        <div className="flex flex-col items-start ml-4 md:ml-16 gap-8">
          <img
            src="/image/毎週日曜日.jpg"
            alt="毎週日曜日"
            style={{
              width: "min(320px, 100%)",
              height: "auto",
              borderRadius: "30px",
            }}
          />
          <p className="text-2xl md:text-4xl font-black text-blue-500 tracking-widest">
            毎週　日曜日　活動
          </p>
        </div>
      </div>
      </Element>
    </section>
  );
}
