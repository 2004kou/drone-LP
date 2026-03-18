"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Button } from "@/app/components/ui/button";
import { ActionState } from "@/app/types";
import { Textarea } from "@/app/components/ui/textarea"
import Link from "next/link";
import { EditPostFormProps } from "@/app/types/types";




export default function EditPostForm({post}:EditPostFormProps) {
  const router = useRouter();

  const [state, setState] = useState<ActionState>({
    success: false,
    errors: {},
  });
  const [isPending, startTransition] = useTransition();

  const errors = state.errors ?? {};

  const [title , setTitle] = useState(post.title)
  const [content , setContent] = useState(post.content)
  const [image, setImage] = useState(post.image)


  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = String(formData.get("title") ?? "");
    const content = String(formData.get("content") ?? "");

    startTransition(async () => {
      //画像をSupabaseにアップロード
      let imageUrl = image ?? "";
      const imageFile = formData.get("image") as File;
      if (imageFile && imageFile.size >0){
        const { createClient } = await import("@supabase/supabase-js");
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
        );
        const ext = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}.${ext}`;
        const { data, error } = await supabase.storage
        .from("images")
        .upload(fileName, imageFile);
        if(error){
          setState({  success: false, errors:{_form:["画像のアップロードに失敗しました"]}})
          return;
        }
        const { data:urlData } = supabase.storage.from("images").getPublicUrl(fileName);
        imageUrl = urlData.publicUrl;
      }
      const res = await fetch(`/api/post/${post.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title,content,image:imageUrl }),
        });

      const data = await res.json().catch(() => null);

  if (!res.ok) {
    setState({
      success: false,
      errors: data?.errors ?? { _form: [data?.error ?? "作成に失敗しました"] },
    });
    return;
  }

  setState({ success: true, errors: {} });
  router.push("/");
  router.refresh();
  });
  }


  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-md p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">投稿編集</h1>
          <Link
            href="/posts/edit"
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            一覧へ戻る
          </Link>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          {errors._form?.length ? (
            <p className="text-red-500 text-sm">{errors._form.join(", ")}</p>
          ) : null}

          <div className="space-y-1">
            <Label htmlFor="title">タイトル</Label>
            <Input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            {errors.title?.length ? (
              <p className="text-red-500 text-sm mt-1">{errors.title.join(", ")}</p>
            ) : null}
          </div>

          <div className="space-y-1">
            <Label htmlFor="content">内容</Label>
            <Textarea id="content" name="content" value={content} onChange={(e) => setContent(e.target.value)} className="min-h-[160px]" />
            {errors.content?.length ? (
              <p className="text-red-500 text-sm mt-1">{errors.content.join(", ")}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label>現在の画像</Label>
            {image ? (
              <img src={image} alt={title} className="w-full h-48 object-cover rounded-lg" />
            ) : (
              <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                画像なし
              </div>
            )}
            <Label htmlFor="picture">画像を変更する</Label>
            <Input id="picture" type="file" name="image" />
            <p className="text-xs text-gray-400">変更しない場合は空のままにしてください</p>
          </div>

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "更新中..." : "更新"}
          </Button>
        </form>
      </div>
    </div>
  );
}