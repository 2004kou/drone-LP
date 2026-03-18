import {prisma}  from "@/lib/db"
import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/lib/auth"
import { postSchema } from "@/lib/validations";
import { z } from "zod";



export async function GET(req:Request,
    {params}:{params: Promise<{id:string}>}) {
    const {id} = await params
    const postDetailData = await prisma.post.findUnique(
        {where:{
            id:id,
            isDeleted:false

    }});
    if (!postDetailData) {
      return NextResponse.json(
        { error: "投稿が見つかりません" },
        { status: 404 }
      );}
    return NextResponse.json(postDetailData)
    
}

export async function PUT(req: NextRequest, { params }: {params:Promise<{id:string}>}) {
  const {id} = await params
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: "認証が必要です。" }, { status: 401 });
    }

    const body = await req.json();
    const validated = postSchema.parse(body);

    const existing = await prisma.post.findFirst({
      where: { id: id, isDeleted: false },
      select: { authorId: true },
    });

    if (!existing) {
      return NextResponse.json({ error: "投稿が見つかりません" }, { status: 404 });
    }

    if (existing.authorId !== userId) {
      return NextResponse.json({ error: "権限がありません。" }, { status: 403 });
    }

    const updated = await prisma.post.update({
      where: { id: id },
      data: { ...validated },
      include: { author: { select: { id: true, name: true } } },
    });

    return NextResponse.json(updated);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "バリデーションエラー", issues: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "投稿の更新に失敗しました。" },
      { status: 500 }
    );
  }
}


export async function DELETE(req: NextRequest, { params }: {params:Promise<{id:string}>}) {
  const { id } = await params
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json(
        { error: "認証が必要です。" },
        { status: 401 }
      );
    }

    const existing = await prisma.post.findFirst({
      where: { id: id, isDeleted: false },
      select: { authorId: true },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "投稿が見つかりません" },
        { status: 404 }
      );
    }

    if (existing.authorId !== userId) {
      return NextResponse.json(
        { error: "権限がありません。" },
        { status: 403 }
      );
    }

    await prisma.post.update({
      where: { id: id },
      data: { isDeleted: true },
    });

    return NextResponse.json({ success: true });

  } catch {
    return NextResponse.json(
      { error: "投稿の削除に失敗しました。" },
      { status: 500 }
    );
  }
}
