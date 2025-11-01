import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please provide a username'],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: [true, 'Please provide a mobile number'],
      unique: true,
      match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false, // Hide password in queries
    },
    role: {
      type: String,
      default: 'admin',
      immutable: true, // cannot be changed after creation
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: Date,
    loginAttempts: {
      type: Number,
      default: 0,
    },
    lockUntil: Date,
  },
  { timestamps: true }
);

// Indexes for better query performance
adminSchema.index({ email: 1 });
adminSchema.index({ username: 1 });
adminSchema.index({ mobile: 1 });

// Auto-update last login timestamp
adminSchema.pre('save', function (next) {
  if (this.isModified('lastLogin')) {
    this.lastLogin = new Date();
  }
  next();
});

export default mongoose.models.Admin || mongoose.model('Admin', adminSchema);
