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
    const { username, email, mobile, password } = body;

    // Validate input
    if (!username || !email || !mobile || !password) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({
      $or: [{ email }, { mobile }, { username }],
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
      username,
      email,
      mobile,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: newAdmin._id, role: "admin" },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const adminData = {
      id: newAdmin._id,
      username: newAdmin.username,
      email: newAdmin.email,
      mobile: newAdmin.mobile,
      role: newAdmin.role,
    };

    const response = NextResponse.json({
      success: true,
      message: "Admin registration successful",
      admin: adminData,
      token,
    });

    // Set cookie
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Admin registration error:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
