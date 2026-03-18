"use client";

import { useRouter } from "next/navigation";
import { useTransition, useState } from "react";
import { Button } from "@/app/components/ui/button";

type DeletePostProps = {
  postId: string;
};

export default function DeletePostDialog({
  postId,
}: DeletePostProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const onDelete = () => {
    startTransition(async () => {
      setError(null);

      const res = await fetch(`/api/post/${postId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "削除に失敗しました");
        return;
      }

      router.push("/");      
      router.refresh();
    });
  };

  return (
        <>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <Button
            onClick={onDelete}
            className="bg-red-500 hover:bg-red-600"
            disabled={isPending}
          >
            {isPending ? "削除中..." : "削除する"}
          </Button>
        </>
  );
}