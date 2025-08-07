import { NextResponse , NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl;

    const name = searchParams.get("name") || "World";

    return NextResponse.json({
        message: `Hello, ${name}!`,
        timestamp: new Date().toLocaleString()
    })
}