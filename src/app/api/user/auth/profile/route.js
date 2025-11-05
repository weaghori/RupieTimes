import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/app/lib/utils/dbConnect";
import User from "@/app/lib/models/User";

const JWT_SECRET = process.env.JWT_SECRET;

export async function GET(req) {
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

    // Find user
    const user = await User.findById(decoded.id);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Prepare safe user data
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      role: user.role,
      isActive: user.isActive,
      address: user.address,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    return NextResponse.json({
      success: true,
      user: userData,
    });

  } catch (error) {
    console.error("Profile error:", error);
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