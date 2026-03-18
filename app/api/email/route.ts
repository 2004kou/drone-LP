import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer"
import Mail from "nodemailer/lib/mailer"


export  async function POST(request:NextRequest) {
    const { name,number,email,grade, message} = await request.json()

    const transport = nodemailer.createTransport({
        host: "sv16304.xserver.jp",
        port:465,
        secure:true,
        auth: {
            user:process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD,
        },
    })

    const mailOptions : Mail.Options = {
        from: process.env.NODEMAILER_EMAIL,
        to: process.env.NODEMAILER_EMAIL,
        subject: `Message from お問合せ(${email})`,
        text: `お名前：${name}\n電話番号：${number}\n学年：${grade}\nお問合せ内容：${message}`
    }

    try {
        await transport.sendMail(mailOptions)
        return NextResponse.json({message:"メールの送信に成功しました."}, {status:200})
    }catch(err){
        return NextResponse.json({message:"メールの送信に失敗しました."}, {status:500})}

}
