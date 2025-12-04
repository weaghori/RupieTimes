"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../assets/logo.svg";

export default function AuthForm() {
  const [activeTab, setActiveTab] = useState("login");
  const [showForgot, setShowForgot] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Toggle between Login and Signup
  const toggleTab = (tab) => {
    setActiveTab(tab);
    setShowForgot(false);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 bg-white p-8 rounded-[20px] shadow-lg border border-gray-200">
        
        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src={logo}
            alt="Rupie Times"
            className="h-16 w-auto"
          />
        </div>

        {/* Header Text */}
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-bold text-[#1E4032]">
            {showForgot 
              ? "Reset Password" 
              : activeTab === "login" 
                ? "Welcome Back" 
                : "Create an account"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {showForgot
              ? "Enter your email to receive password reset instructions."
              : activeTab === "login"
                ? "Let's sign in to your account and get started."
                : "Please enter your details to create an account"}
          </p>
        </div>

        {/* Tabs (Only show if not in Forgot Password mode) */}
        {!showForgot && (
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`flex-1 py-4 text-center text-sm font-medium transition-colors duration-200 ${
                activeTab === "login"
                  ? "text-[#C0934B] border-b-2 border-[#C0934B]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => toggleTab("login")}
            >
              Sign In
            </button>
            <button
              className={`flex-1 py-4 text-center text-sm font-medium transition-colors duration-200 ${
                activeTab === "signup"
                  ? "text-[#C0934B] border-b-2 border-[#C0934B]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => toggleTab("signup")}
            >
              Sign Up
            </button>
          </div>
        )}

        {/* Forms */}
        <div className="mt-8 space-y-6">
          
          {/* Forgot Password View */}
          {showForgot && (
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="forgot-email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="mt-1">
                  <input
                    id="forgot-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#C0934B] focus:border-[#C0934B] sm:text-sm"
                    placeholder="Enter Your Email Address"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#C0934B] hover:bg-[#a37c3f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C0934B]"
                >
                  Send Reset Link
                </button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setShowForgot(false)}
                  className="text-sm font-medium text-[#1E4032] hover:text-[#142b22]"
                >
                  Back to Sign In
                </button>
              </div>
            </form>
          )}

          {/* Login View */}
          {!showForgot && activeTab === "login" && (
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#C0934B] focus:border-[#C0934B] sm:text-sm"
                    placeholder="Enter Your Email Address"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#C0934B] focus:border-[#C0934B] sm:text-sm"
                    placeholder="Enter Your Password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-[#C0934B] focus:ring-[#C0934B] border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <button
                    type="button"
                    onClick={() => setShowForgot(true)}
                    className="font-medium text-gray-900 hover:text-[#C0934B]"
                  >
                    Forgot Your Password?
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#C0934B] hover:bg-[#a37c3f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C0934B]"
                >
                  Sign in
                </button>
              </div>

              <div className="text-center text-sm">
                <span className="text-gray-600">Don't have account yet? </span>
                <button
                  type="button"
                  onClick={() => toggleTab("signup")}
                  className="font-bold text-[#1E4032] hover:text-[#142b22]"
                >
                  Sign Up
                </button>
              </div>
            </form>
          )}

          {/* Signup View */}
          {!showForgot && activeTab === "signup" && (
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    id="fullname"
                    name="fullname"
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#C0934B] focus:border-[#C0934B] sm:text-sm"
                    placeholder="Enter Your Full Name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <div className="mt-1">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#C0934B] focus:border-[#C0934B] sm:text-sm"
                    placeholder="Enter Your Phone Number"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="signup-email"
                    name="email"
                    type="email"
                    required
                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#C0934B] focus:border-[#C0934B] sm:text-sm"
                    placeholder="Enter Your Email Address"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="signup-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#C0934B] focus:border-[#C0934B] sm:text-sm"
                    placeholder="Enter Your Password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#C0934B] focus:border-[#C0934B] sm:text-sm"
                    placeholder="Enter Your Confirm Password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="signup-remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#C0934B] focus:ring-[#C0934B] border-gray-300 rounded"
                />
                <label htmlFor="signup-remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#C0934B] hover:bg-[#a37c3f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C0934B]"
                >
                  Sign Up
                </button>
              </div>

              <div className="text-center text-sm">
                <span className="text-gray-600">Already have account ? </span>
                <button
                  type="button"
                  onClick={() => toggleTab("login")}
                  className="font-bold text-[#1E4032] hover:text-[#142b22]"
                >
                  Sign In
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
