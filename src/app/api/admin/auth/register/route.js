// app/api/admin/auth/register/route.js
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
    const { name, email, mobile, password } = body;

    // Validate input
    if (!name || !email || !mobile || !password) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({
      $or: [{ email }, { mobile }],
    });

    if (existingAdmin) {
      return NextResponse.json(
        { success: false, message: "Admin already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const newAdmin = await Admin.create({
      name,
      email,
      mobile,
      password: hashedPassword,
    });

    // Generate JWT token with 1 year expiration
    const token = jwt.sign(
      { 
        id: newAdmin._id, 
        email: newAdmin.email,
        role: "admin" 
      },
      JWT_SECRET,
      { expiresIn: "365d" }
    );

    const adminData = {
      id: newAdmin._id,
      name: newAdmin.name,
      email: newAdmin.email,
      mobile: newAdmin.mobile,
      role: newAdmin.role,
      isActive: newAdmin.isActive
    };

    const response = NextResponse.json({
      success: true,
      message: "Admin registration successful",
      admin: adminData,
      token,
    });

    // Set cookie with 1 year expiration
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 365 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Admin registration error:", error);
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Admin with this email or mobile already exists" 
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}