import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export function authenticateAdmin(request) {
  try {
    // Get token from cookie
    const token = request.cookies.get('admin_token')?.value;
    
    if (!token) {
      return {
        success: false,
        error: 'Access denied. No token provided.',
        status: 401
      };
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Check if user has admin role
    if (decoded.role !== 'admin' && decoded.role !== 'superadmin') {
      return {
        success: false,
        error: 'Access denied. Admin privileges required.',
        status: 403
      };
    }

    return {
      success: true,
      admin: decoded
    };
  } catch (error) {
    return {
      success: false,
      error: 'Invalid token.',
      status: 401
    };
  }
}