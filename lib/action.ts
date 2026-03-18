"use server"
import { redirect } from "next/navigation";
import { signIn } from '@/lib/auth';
import { signOut } from "@/lib/auth";



//ログイン機能
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials',{
        ...Object.fromEntries(formData),
        redirect:false,
    });
    redirect('/posts/create')
  } catch (error) {
    if ((error as {type?: string})?.type === 'CredentialsSignin') {
      return 'メールアドレスまたはパスワードが正しくありません。';
    }
    throw error;
  }
}


//ログアウト機能
export async function logout() {
  await signOut({ redirectTo: "/login" });
}