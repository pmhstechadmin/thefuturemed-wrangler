import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // This should be replaced with your actual token generation logic
    // For production, use a proper JWT generation method
    const token = process.env.VIDEOSDK_TOKEN;
    
    if (!token) {
      return NextResponse.json(
        { error: "VideoSDK token not configured" },
        { status: 500 }
      );
    }

    return NextResponse.json({ token });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate token" },
      { status: 500 }
    );
  }
}