// src/app/lib/models/Subscription.js
import mongoose from 'mongoose';

const SubscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  variant: {
    duration: {
      type: String,
      required: true
      // REMOVED: enum: ['3 months', '6 months', '1 year'] - This is causing the error
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    durationMonths: {
      type: Number,
      required: true,
      min: 1
    }
  },
  status: {
    type: String,
    enum: ['active', 'expired', 'cancelled', 'pending'],
    default: 'pending'
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentId: {
    type: String
  },
  transactionId: {
    type: String
  },
  metadata: {
    type: Object,
    default: {}
  }
}, {
  timestamps: true
});

// Index for better query performance
SubscriptionSchema.index({ user: 1, status: 1 });
SubscriptionSchema.index({ endDate: 1 });
SubscriptionSchema.index({ product: 1 });

// Virtual for checking if subscription is active
SubscriptionSchema.virtual('isActive').get(function() {
  return this.status === 'active' && new Date() < this.endDate;
});

// Method to calculate end date based on duration months
SubscriptionSchema.methods.calculateEndDate = function(durationMonths) {
  const start = this.startDate || new Date();
  const end = new Date(start);
  end.setMonth(end.getMonth() + durationMonths);
  return end;
};

// Ensure virtual fields are serialized
SubscriptionSchema.set('toJSON', { virtuals: true });

export default mongoose.models.Subscription || mongoose.model('Subscription', SubscriptionSchema);