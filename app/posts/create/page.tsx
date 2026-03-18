"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Button } from "@/app/components/ui/button";
import { ActionState } from "@/app/types";
import { Textarea } from "@/app/components/ui/textarea"
import Link from "next/link";




export default function CreatePage() {
  const router = useRouter();

  const [state, setState] = useState<ActionState>({
    success: false,
    errors: {},
  });
  const [isPending, startTransition] = useTransition();

  const errors = state.errors ?? {};

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = String(formData.get("title") ?? "");
    const content = String(formData.get("content") ?? "");

    startTransition(async () => {
      //画像をSupabaseにアップロード
      let imageUrl = "";
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
      const res = await fetch(`/api/post`, {
          method: "POST",
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
        <h1 className="text-2xl font-bold mb-6 text-gray-800">新規投稿</h1>

        <form onSubmit={onSubmit} className="space-y-6">
          {errors._form?.length ? (
            <p className="text-red-500 text-sm">{errors._form.join(", ")}</p>
          ) : null}

          <div className="space-y-1">
            <Label htmlFor="title">タイトル</Label>
            <Input type="text" id="title" name="title" placeholder="タイトルを入力" />
            {errors.title?.length ? (
              <p className="text-red-500 text-sm mt-1">{errors.title.join(", ")}</p>
            ) : null}
          </div>

          <div className="space-y-1">
            <Label htmlFor="content">内容</Label>
            <Textarea id="content" name="content" placeholder="内容を入力してください" className="min-h-[160px]" />
            {errors.content?.length ? (
              <p className="text-red-500 text-sm mt-1">{errors.content.join(", ")}</p>
            ) : null}
          </div>

          <div className="space-y-1">
            <Label htmlFor="picture">画像</Label>
            <Input id="picture" type="file" name="image" />
            <p className="text-xs text-gray-400">アップロードする画像を選択してください</p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <Button type="submit" disabled={isPending}>
              {isPending ? "作成中..." : "作成"}
            </Button>
            <Link
              href="/posts/edit"
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              編集一覧へ
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}