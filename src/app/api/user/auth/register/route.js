import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "@/app/lib/utils/dbConnect";
import User from "@/app/lib/models/User";

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

    // Check if user already exists by email or mobile
    const existingUser = await User.findOne({
      $or: [{ email }, { mobile }],
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      name,
      email,
      mobile,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Prepare safe user data (excluding password)
    const userData = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      mobile: newUser.mobile,
      role: newUser.role,
      subscriptionPlan: newUser.subscriptionPlan,
      subscriptionStatus: newUser.subscriptionStatus,
    };

    // Create response
    const response = NextResponse.json({
      success: true,
      message: "Registration successful",
      user: userData,
      token,
    });

    // Set secure cookie for token
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
