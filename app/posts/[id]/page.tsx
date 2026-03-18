import { Post } from "@/app/types/types";
import Link from "next/link";
import Image from "next/image";


 async function getDetailPost(id:string) {
   const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/post/${id}`,{
        cache: "no-store",
      })
      const postDetailData:Post = await response.json();
      
      return postDetailData;    
    }

    const postDetailPage = async({params}:{params: Promise<{id:string}>})=>{
        const {id} = await params
        const postDetailData = await getDetailPost(id);
        return (
          <div className="min-h-screen bg-gray-50">
            {/* 戻るボタン */}
            <div className="px-6 pt-10 max-w-5xl mx-auto">
              <Link
                href="/#articles"
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 rounded-full px-4 py-2 shadow text-sm font-bold text-gray-700 transition duration-300"
              >
                <Image
                  src="/image/矢印ボタン　左3.png"
                  alt="戻る"
                  width={20}
                  height={20}
                  className="object-contain"
                />
                ホームへ戻る
              </Link>
            </div>

            <article className="max-w-5xl mx-auto px-6 py-10">
              {/* タイトル・日付 */}
              <h1 className="text-4xl font-bold text-gray-900 mb-3 leading-snug">
                {postDetailData.title}
              </h1>
              <span className="text-sm text-gray-500">
                {new Date(postDetailData.createdAt).toLocaleDateString("ja-JP", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>

              {/* 画像：フル幅 */}
              <div className="mt-8 mb-10 w-full">
                {postDetailData.image ? (
                  <Image
                    src={postDetailData.image}
                    alt={postDetailData.title}
                    width={1200}
                    height={600}
                    className="w-full h-[420px] rounded-2xl object-cover shadow-sm"
                  />
                ) : (
                  <div className="w-full h-[420px] bg-gray-200 rounded-2xl" />
                )}
              </div>

              {/* 本文 */}
              <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap max-w-3xl">
                {postDetailData.content}
              </p>
            </article>
          </div>
        )
    }
    export default postDetailPage
