// app/api/admin/auth/login/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "@/app/lib/utils/dbConnect";
import Admin from "@/app/lib/models/Admin";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { email, username, password } = body;

    // Validate input - admin can login with email or username
    if (!password || (!email && !username)) {
      return NextResponse.json(
        { success: false, message: "Email/username and password are required" },
        { status: 400 }
      );
    }

    // Find admin by email or username
    const admin = await Admin.findOne({
      $or: [{ email }, { username }],
    }).select('+password'); // Include password field

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Check if admin is active
    if (!admin.isActive) {
      return NextResponse.json(
        { success: false, message: "Admin account is deactivated" },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Generate JWT token with 1 year expiration
    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
        role: admin.role,
      },
      JWT_SECRET,
      { expiresIn: "365d" }
    );

    // Prepare safe admin data
    const adminData = {
      id: admin._id,
      username: admin.username,
      email: admin.email,
      mobile: admin.mobile,
      role: admin.role,
      isActive: admin.isActive,
      lastLogin: admin.lastLogin
    };

    // Create response
    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      admin: adminData,
      token,
    });

    // Set secure cookie
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 365 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);
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