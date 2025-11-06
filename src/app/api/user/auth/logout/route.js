// src/app/api/user/auth/logout/route.js
import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Clear user cookie
    const response = NextResponse.json({
      success: true,
      message: "User logged out successfully",
    });

    // Remove the JWT token cookie
    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(0), // expires immediately
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("User logout error:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
