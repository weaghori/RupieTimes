// app/api/user/delete/route.js
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/app/lib/utils/dbConnect";
import User from "@/app/lib/models/User";

const JWT_SECRET = process.env.JWT_SECRET;

export async function DELETE(req) {
  try {
    await connectDB();

    // Get token from header
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 }
      );
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 401 }
      );
    }

    // Find and delete user
    const deletedUser = await User.findByIdAndDelete(decoded.id);
    
    if (!deletedUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Create response and clear cookie
    const response = NextResponse.json({
      success: true,
      message: "Account deleted successfully",
    });

    // Clear the token cookie
    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0, // Expire immediately
      path: "/",
    });

    return response;

  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Server error", 
        error: error.message 
      },
      { status: 500 }
    );
  }
}