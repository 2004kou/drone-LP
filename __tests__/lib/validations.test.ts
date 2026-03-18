import { postSchema,loginSchema, } from "@/lib/validations"



describe("Validation Schemas", () => {
  describe("postSchema", () => {
    it("有効な投稿データを通す", () => {
      const validData = {
        title: "テスト投稿",
        content: "これはテスト投稿の本文です",
        image:"image"
      }

      expect(() => postSchema.parse(validData)).not.toThrow()
    })

    it("タイトルが空の場合はエラーを返す", () => {
      const invalidData = {
        title: "",
        content: "本文",
        image:"image"
      }

      expect(() => postSchema.parse(invalidData)).toThrow()
    })

    it("本文が空の場合はエラーを返す。", () =>{
      const invalidData = {
        title:"タイトル",
        content:"",
        image:"image"
      }
      expect(() => postSchema.parse(invalidData)).toThrow()
    } )

    it("写真が空の場合はエラーを返す。", () =>{
      const invalidData = {
        title:"タイトル",
        content: "これはテスト投稿の本文です",
        image:""
      }
      expect(() => postSchema.parse(invalidData)).toThrow()
    } )

    it("タイトルが100文字を超える場合はエラーを返す", () =>{
      const invalidData = {
        title:"あ".repeat(101),
        content:"本文",
        image:"image"
      }
      expect(() => postSchema.parse(invalidData)).toThrow()
    })

    it("タイトルがちょうど100文字の場合は通す", () =>{
      const validData = {
        title:"あ".repeat(100),
        content:"本文",
        image:"image"
      }
      expect(() => postSchema.parse(validData)).not.toThrow()
    })

    it("本文が2000文字を超える場合はエラーを返す", () =>{
      const invalidData = {
        title : "タイトル",
        content :"あ".repeat(2001),
        image:"image"
      }
      expect(() => postSchema.parse(invalidData)).toThrow()
    })
  })


  

  describe("loginSchema", () =>{
    it("有効なログインデータを通す", () =>{
      const validData = {
        email:"test@example.com",
        password:"Password123"
      }
      expect(() => loginSchema.parse(validData)).not.toThrow()
    })

    it("メールアドレスが空の場合はエラーを返す", () =>{
      const invalidData = {
        email: "",
        password:"Password123"
      }
      expect(() => loginSchema.parse(invalidData)).toThrow()
    })

    it("パスワードが空の場合はエラーを返す", () =>{
      const invalidData = {
        email:"test@example.com",
        password:""
      }
      expect(() => loginSchema.parse(invalidData)).toThrow()
    })
  })
})
 