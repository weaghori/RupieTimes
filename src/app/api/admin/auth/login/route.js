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
    const { emailOrMobile, password } = body;

    if (!emailOrMobile || !password) {
      return NextResponse.json(
        { success: false, message: "Email or Mobile and password are required" },
        { status: 400 }
      );
    }

    //Find admin by email or mobile only
    const admin = await Admin.findOne({
      $or: [
        { email: emailOrMobile },
        { mobile: emailOrMobile },
      ],
    }).select("+password");

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Invalid email or mobile" },
        { status: 400 }
      );
    }

    //Compare password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid password" },
        { status: 400 }
      );
    }

    //Generate JWT
    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    //Update last login
    admin.lastLogin = new Date();
    await admin.save();

    const adminData = {
      id: admin._id,
      username: admin.username,
      email: admin.email,
      mobile: admin.mobile,
      role: admin.role,
    };

    const response = NextResponse.json({
      success: true,
      message: "Admin login successful",
      admin: adminData,
      token,
    });

    //Set secure cookie
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
