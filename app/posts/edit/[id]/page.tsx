import EditPostForm from "./EditPostForm";
import { prisma } from "@/lib/db";

export default async function Page({ params }: { params: Promise<{id:string}> }) {
  const  {id} = await params;
  // idを使ってDBから全データ取得
  const post = await prisma.post.findUnique({
    where: { id: id,
             isDeleted:false,
     },
          select: {
            id:true,
            title: true,
            content:true,
            image:true
          }
        });
        if (!post) return <div>指定の記事が見つかりません。</div>
  // 取得したpostをまるごとEditPostFormに渡す
  return <EditPostForm post={post} />;
}

  