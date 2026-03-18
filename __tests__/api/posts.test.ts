import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { NextRequest } from "next/server"

jest.mock("@/lib/db", () => ({
  prisma: {
    post: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
  },
}))

jest.mock("@/lib/auth", () => ({
  auth: jest.fn(),
}))

describe("/api/post", () => {
  //各テストの前にモックをリセット
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe("GET", () => {
    it("投稿一覧を正常に取得する", async () => {
      const mockPosts = [
        {
          id: "1",
          title: "テスト投稿",
          content: "テスト内容",
          image:"https://example.com/image.jpg",
          createdAt:"2024-01-01T00:00:00.000Z"
        },
      ]
      ;(prisma.post.findMany as jest.Mock).mockResolvedValue(mockPosts)

      const request = new Request("http://localhost:3000/api/posts")

      const { GET } = await import("@/app/api/post/route")

      const response = await GET(request as NextRequest)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.posts).toEqual(mockPosts)
    })

    it("投稿が0件の場合はから配列を返す", async() => {
      const mockPosts:any[] = []
      ;(prisma.post.findMany as jest.Mock).mockResolvedValue(mockPosts)

      const request = new Request("http://localhost:3000/api/post")

      const { GET }  = await import("@/app/api/post/route")

      const response = await GET(request as NextRequest)
      const data = await response.json()

      expect(response.status).toBe(200)
      console.log(data)
      expect(data.posts).toEqual([])
    })


  })
})

describe("POST /api/post", () => {
  //各テストの前にモックをリセット
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it("投稿を作成できる", async () => {
    ;(auth as jest.Mock).mockResolvedValue({ user: { id: "1" } }) 

    ;(prisma.post.create as jest.Mock).mockResolvedValue({ id: "1" })

    const request = new Request("http://localhost:3000/api/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "テスト投稿",
        content: "テスト内容",
        image:"https://example.com/image.jpg"
      }),
    })

    const { POST } = await import("@/app/api/post/route")


    const res = await POST(request as NextRequest)
    expect(auth).toHaveBeenCalled()
    expect(res.status).toBe(201)
  })

  it("未認証の場合は401を返す", async () =>{
    (auth as jest.Mock).mockResolvedValue(null)

    const request = new Request("http://localhost:3000/api/posts", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({title:"テスト",content:"テスト",image:"https://example.com/image.jpg"}),


    })

    const { POST } = await import("@/app/api/post/route")
    const res = await POST(request as NextRequest)

    expect(res.status).toBe(401)
  })
})
