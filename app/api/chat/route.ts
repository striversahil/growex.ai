import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.json();
  console.log("Form Data:", formData);

  return NextResponse.json({
    message: "Chat message received",
    data: {
      query: formData.query,
    },
  });
}
