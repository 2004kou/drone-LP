
import { NextRequest } from "next/server";
import { createTransport } from "nodemailer";


jest.mock("nodemailer", () =>({
    createTransport:jest.fn().mockReturnValue({
        sendMail:jest.fn(),
    })
}))


describe("POST api/email", () =>{
    it("メールの送信に成功したら200を返す", async () =>{
        const { createTransport } =require("nodemailer")
        createTransport().sendMail.mockResolvedValue({})

        const request = new Request("http://localhost:3000/api/email",{
            method: "POST",
            headers: { "Content-Type":"application/json"},
            body:JSON.stringify({
                name:"テストユーザー",
                number:"090-0000-0000",
                email:"test@example.com",
                grade:"中学一年生",
                message:"テストメッセージ",
            }),
        })
        const { POST } = await import("@/app/api/email/route")
        const res = await POST(request as NextRequest)

        expect(res.status).toBe(200)
    })

    it("メールの送信に失敗したら500を返す", async () =>{
        const { createTransport } = require("nodemailer")
        createTransport().sendMail.mockRejectedValue(new Error("送信失敗"))
    
        const request = new Request("http://localhost:3000/api/email",{
                method: "POST",
                headers: { "Content-Type":"application/json"},
                body:JSON.stringify({
                    name:"テストユーザー",
                    number:"090-0000-0000",
                    email:"test@example.com",
                    grade:"中学一年生",
                    message:"テストメッセージ",
                }),
            })
            const { POST } = await import("@/app/api/email/route")
            const res = await POST(request as NextRequest)

            expect(res.status).toBe(500)
    })
})


