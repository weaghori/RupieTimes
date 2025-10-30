'use client';

import { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(''); // ✅ Added success message state

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage(''); // clear old message

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log('Form submitted:', formData);
    setIsSubmitting(false);

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });

    // ✅ Show success message
    setSuccessMessage('Message sent successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SECTION 1: FORM & CONTACT INFO */}
      <div className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-20">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#c19755] mb-2">
              Let's Connect
            </p>
            <h1 className="text-5xl font-bold text-[#1e4033] mb-4">
              Connect with Our <span className="text-[#c19755]">Analysts</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have a question about the market or your subscription? We're here
              to help.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="backdrop-blur supports-[backdrop-filter]:bg-white/80 bg-white/90 border-b border-slate-200/70 rounded-2xl shadow-2xl border border-[#eaeef4] shadow-gray-300/50 p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-gray-100 border border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-[#c19755] focus:border-transparent transition-all duration-300 placeholder-gray-500"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-gray-100 border border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-[#c19755] focus:border-transparent transition-all duration-300 placeholder-gray-500"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-gray-100 border border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-[#c19755] focus:border-transparent transition-all duration-300 placeholder-gray-500"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-gray-100 border border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-[#c19755] focus:border-transparent transition-all duration-300 placeholder-gray-500"
                      placeholder="Enter your subject"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-gray-100 border border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-[#c19755] focus:border-transparent transition-all duration-300 resize-none placeholder-gray-500"
                    placeholder="Tell us how we can help you..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 bg-[#1f3e32] text-white text-lg font-bold rounded-lg hover:bg-[#2a4f3f] focus:ring-4 focus:ring-[#c19755]/50 focus:ring-offset-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-lg"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="w-6 h-6 border-t-2 border-white border-solid rounded-full animate-spin mr-3"></div>
                      Sending...
                    </div>
                  ) : (
                    'Send Message'
                  )}
                </button>

                {/* ✅ Success Message */}
                {successMessage && (
                  <p className="text-green-600 font-medium text-center mt-4">
                    {successMessage}
                  </p>
                )}
              </form>
            </div>

            {/* Contact Information */}
            <div className="backdrop-blur supports-[backdrop-filter]:bg-white/80 bg-white/90 border-b border-slate-200/70 rounded-2xl shadow-2xl border border-[#eaeef4] shadow-gray-300/50 p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Contact Information
              </h2>
              <div className="space-y-8">
                <div className="flex items-start space-x-5 p-4 rounded-lg hover:bg-gray-50 transition-all duration-300">
                  <div className="w-14 h-14 bg-[#f9f5ed] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-[#1f3e32]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Head Office
                    </h3>
                    <p className="text-gray-600">
                      11 Wall Street
                      <br />
                      New York, NY 10005
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-5 p-4 rounded-lg hover:bg-gray-50 transition-all duration-300">
                  <div className="w-14 h-14 bg-[#f9f5ed] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-[#1f3e32]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Support Hotline
                    </h3>
                    <p className="text-gray-600">
                      +91 9876543210
                      <br />
                      Mon-Fri from 9am to 5pm (EST)
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-5 p-4 rounded-lg hover:bg-gray-50 transition-all duration-300">
                  <div className="w-14 h-14 bg-[#f9f5ed] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-[#1f3e32]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Email Address
                    </h3>
                    <p className="text-gray-600">
                      support@company.com
                      <br />
                      premium@company.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: FULL WIDTH MAP */}
      <div className="py-12 bg-white">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Our Location
        </h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.330606411135!2d-74.0135118241642!3d40.71077573763784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a18116f1b13%3A0x2f89c067808c10de!2sNew%20York%20Stock%20Exchange!5e0!3m2!1sen!2sin!4v1730335041926!5m2!1sen!2sin"
          width="100%"
          height="500"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;
