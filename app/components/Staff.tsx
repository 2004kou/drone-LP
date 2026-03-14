"use client";

import { useEffect, useRef, useState } from "react";
import { Element } from 'react-scroll';

const members = [
  {
    image: null,
    name: "髙見　勇輝",
    description:
      "私たちは、子どもたちが本気で挑戦できる場所をつくりたいと考えています。\nドローンサッカーを通して、仲間と協力する力、考える力、そして最後までやり抜く力を育てていきます。\n毎週の活動が「楽しみ」になるよう、全力でサポートします。",
  },
  {
    image: null,
    name: "井上　高",
    description:
      "初めてでも安心して参加できる環境づくりを大切にしています。\n技術だけでなく、礼儀やチームワークも学べる場として、一人ひとりの成長に寄り添います。\n子どもたちが自信を持てるよう、スタッフ一同全力でサポートいたします。",
  },
];

function StaffCard({ member, index }: { member: typeof members[0]; index: number }) {
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
      className={`flex flex-col md:flex-row gap-6 md:gap-10 items-start transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >

      {/* 画像 */}
      <div
        className="flex-shrink-0 bg-gray-300 rounded-xl w-full md:w-[360px] h-48 md:h-[240px]"
      >
        {member.image && (
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover rounded-xl"
          />
        )}
      </div>

      {/* テキスト */}
      <div className="pt-2">
        <h3
          className="text-4xl font-black mb-6"
          style={{ color: "#0d1b5e" }}
        >
          {member.name}
        </h3>
        <p className="text-base leading-relaxed text-gray-800 whitespace-pre-line">
          {member.description}
        </p>
      </div>
    </div>
  );
}

export default function Staff() {
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
    <section id="staff" className="bg-[#e8eef8] px-8 py-16 md:px-20">
      <Element name="staffSection">
      <h2
        ref={titleRef}
        className={`text-center text-5xl font-black mb-16 transition-all duration-700 ${
          titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
        style={{ color: "#0d1b5e" }}
      >
        スタッフ紹介
      </h2>

      <div className="space-y-16 max-w-4xl mx-auto">
        {members.map((member, i) => (
          <StaffCard key={i} member={member} index={i} />
        ))}
      </div>
      </Element>
    </section>
  );
}
