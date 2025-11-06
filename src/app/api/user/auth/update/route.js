// src/app/api/user/auth/update/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "@/app/lib/utils/dbConnect";
import User from "@/app/lib/models/User";

const JWT_SECRET = process.env.JWT_SECRET;

export async function PUT(req) {
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

    const body = await req.json();
    const { 
      name, 
      email, 
      mobile, 
      password,
      address 
    } = body;

    // Find user
    const user = await User.findById(decoded.id);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Check if email or mobile already exists (excluding current user)
    if (email && email !== user.email) {
      const existingEmail = await User.findOne({ email, _id: { $ne: decoded.id } });
      if (existingEmail) {
        return NextResponse.json(
          { success: false, message: "Email already exists" },
          { status: 400 }
        );
      }
    }

    if (mobile && mobile !== user.mobile) {
      const existingMobile = await User.findOne({ mobile, _id: { $ne: decoded.id } });
      if (existingMobile) {
        return NextResponse.json(
          { success: false, message: "Mobile number already exists" },
          { status: 400 }
        );
      }
    }

    // Prepare update data
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (mobile) updateData.mobile = mobile;

    // Update password if provided
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    // Update address if provided
    if (address) {
      updateData.address = {
        country: address.country || user.address.country,
        state: address.state || user.address.state,
        district: address.district || user.address.district,
        city: address.city || user.address.city,
        village: address.village !== undefined ? address.village : user.address.village,
        pincode: address.pincode || user.address.pincode,
        address: address.address || user.address.address
      };
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      decoded.id,
      updateData,
      { new: true, runValidators: true }
    );

    // Prepare response data
    const userData = {
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      mobile: updatedUser.mobile,
      role: updatedUser.role,
      address: updatedUser.address
    };

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      user: userData,
    });

  } catch (error) {
    console.error("Update error:", error);
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Email or mobile number already exists" 
        },
        { status: 400 }
      );
    }
    
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