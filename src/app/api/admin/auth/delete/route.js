// app/api/admin/auth/delete/route.js
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/app/lib/utils/dbConnect";
import Admin from "@/app/lib/models/Admin";

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

    // Check if user is admin
    if (decoded.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: "Admin access required" },
        { status: 403 }
      );
    }

    // Find and delete admin
    const deletedAdmin = await Admin.findByIdAndDelete(decoded.id);
    
    if (!deletedAdmin) {
      return NextResponse.json(
        { success: false, message: "Admin not found" },
        { status: 404 }
      );
    }

    // Create response and clear cookie
    const response = NextResponse.json({
      success: true,
      message: "Admin account deleted successfully",
    });

    // Clear the admin token cookie
    response.cookies.set("admin_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });

    return response;

  } catch (error) {
    console.error("Admin delete error:", error);
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