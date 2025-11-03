// app/api/admin/auth/update/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "@/app/lib/utils/dbConnect";
import Admin from "@/app/lib/models/Admin";

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

    // Check if user is admin
    if (decoded.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: "Admin access required" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { name, email, mobile, password } = body;

    // Find admin
    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Admin not found" },
        { status: 404 }
      );
    }

    // Check if email or mobile already exists (excluding current admin)
    if (email && email !== admin.email) {
      const existingEmail = await Admin.findOne({ email, _id: { $ne: decoded.id } });
      if (existingEmail) {
        return NextResponse.json(
          { success: false, message: "Email already exists" },
          { status: 400 }
        );
      }
    }

    if (mobile && mobile !== admin.mobile) {
      const existingMobile = await Admin.findOne({ mobile, _id: { $ne: decoded.id } });
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

    // Update admin
    const updatedAdmin = await Admin.findByIdAndUpdate(
      decoded.id,
      updateData,
      { new: true, runValidators: true }
    );

    // Prepare response data
    const adminData = {
      id: updatedAdmin._id,
      name: updatedAdmin.name,
      email: updatedAdmin.email,
      mobile: updatedAdmin.mobile,
      role: updatedAdmin.role,
      isActive: updatedAdmin.isActive
    };

    return NextResponse.json({
      success: true,
      message: "Admin profile updated successfully",
      admin: adminData,
    });

  } catch (error) {
    console.error("Admin update error:", error);
    
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