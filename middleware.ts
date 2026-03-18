import { NextRequest, NextResponse } from "next/server";
import { Ratelimit }  from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(3, "10 m"),
});

export async function middleware(request:NextRequest) {
    const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1"

    const { success } = await ratelimit.limit(ip);

    if(!success){
        return NextResponse.json(
            {error:"送信回数が多すぎます。しばらく待ってからお試しください。"},
            {status:429}
        );
    }
    return NextResponse.next();
}

// api/email/にだけ適用
export const config = {
    matcher:"/api/email",
}