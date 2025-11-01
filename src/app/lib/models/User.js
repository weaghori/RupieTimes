import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      maxlength: 50,
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
      match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit mobile number'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ['user', 'premium'],
      default: 'user',
    },

    // Subscription details
    subscriptionPlan: {
      type: String,
      enum: ['free', '3month', '6month', '1year'],
      default: 'free',
    },
    subscriptionStatus: {
      type: String,
      enum: ['active', 'inactive', 'expired', 'cancelled'],
      default: 'inactive',
    },
    subscriptionStartDate: Date,
    subscriptionEndDate: Date,
    autoRenew: {
      type: Boolean,
      default: false,
    },
    renewalCount: {
      type: Number,
      default: 0,
    },

    // Profile info
    profilePhone: String,
    profileAddress: {
      street: String,
      city: String,
      country: String,
      zipCode: String,
    },

    isVerified: {
      type: Boolean,
      default: false,
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

// Indexes for faster query performance
userSchema.index({ email: 1 });
userSchema.index({ mobile: 1 });
userSchema.index({ subscriptionStatus: 1 });
userSchema.index({ subscriptionEndDate: 1 });
userSchema.index({ role: 1 });

// Automatically set subscription dates when activated
userSchema.pre('save', function (next) {
  if (this.isModified('subscriptionStatus') && this.subscriptionStatus === 'active') {
    this.subscriptionStartDate = new Date();
    const endDate = new Date(this.subscriptionStartDate);

    switch (this.subscriptionPlan) {
      case '3month':
        endDate.setMonth(endDate.getMonth() + 3);
        break;
      case '6month':
        endDate.setMonth(endDate.getMonth() + 6);
        break;
      case '1year':
        endDate.setFullYear(endDate.getFullYear() + 1);
        break;
      default:
        endDate.setMonth(endDate.getMonth() + 1);
        break;
    }

    this.subscriptionEndDate = endDate;
  }
  next();
});

export default mongoose.models.User || mongoose.model('User', userSchema);
