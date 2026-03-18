"use client"

import { useEffect, useRef, useState } from "react";
import { Post } from "@/app/types/types";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/app/components/ui/dialog";
import DeletePostDialog from "@/app/admin/delete/DeletePostDialog";




export default  function EditPostList() {
  const [articles, setArticles] = useState<Post[]>([])
  const [ currentPage, setCurrentPage ] = useState(1)
  const postsPerPage = 6
  const displayArticles = articles.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  )

  useEffect (() =>{
    //コンポーネントが画面に表示された後、一度だけ実行される
    fetch("/api/post")
      .then((res) => res.json())//レスポンスをJSONに変換
      .then((data) =>{
        //data = {post:[]}という形で返ってくる
        setArticles(data.posts);//articleを更新　－＞再描画される
      });
  },[]); //<-[]は最初の一回だけ実行という意味

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
    <section id="articles" className="min-h-screen bg-gray-50 px-6 py-12 md:px-16">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">投稿一覧（編集）</h1>
      <div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full"
      >
        {displayArticles.map((article, i) => (
          <div
            key={article.id}
            className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            {/* サムネイル */}
            <div className="w-full h-48 bg-gray-200 overflow-hidden">
              {article.image ? (
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-400 text-sm">
                  画像なし
                </div>
              )}
            </div>

            {/* テキスト部分 */}
            <div className="p-4">
              <p className="text-lg font-bold mb-2 text-gray-800 line-clamp-2">
                {article.title}
              </p>
              <span className="text-xs text-gray-500">
                {new Date(article.createdAt).toLocaleDateString("ja-JP", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            {/* ボタン */}
            <div className="flex gap-2 px-4 pb-4">
              <Button asChild size="sm">
                <Link href={`/posts/edit/${article.id}`}>編集</Link>
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive" size="sm">削除</Button>
                </DialogTrigger>
                <DialogContent>
                  <p className="text-sm font-medium mb-4">本当に削除しますか？</p>
                  <DeletePostDialog postId={article.id} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
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
    </section>
  );
}
