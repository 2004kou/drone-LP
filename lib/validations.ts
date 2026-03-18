import { z } from "zod"


export const loginSchema = z.object({
  email: z.string().email("有効なメールアドレスを入力してください"),
  password: z.string().min(1, "パスワードは必須です")
})

export const postSchema = z.object({
  title: z.string()
    .min(1, "タイトルは必須です")
    .max(100, "タイトルは100文字以内で入力してください"),
  content: z.string()
    .min(1, "本文は必須です")
    .max(2000, "本文は2000文字以内で入力してください"),
  image: z.string()
    .min(1, "写真は必須です")

})

