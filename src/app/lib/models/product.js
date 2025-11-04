import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  heading: {
    type: String,
    required: true,
    trim: true
  },
  shortDescription: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  fullDescription: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  variants: {
    type: [{
      duration: {
        type: String,
        required: true,
        enum: ['3 months', '6 months', '1 year'],
        default: '3 months'
      },
      price: {
        type: Number,
        required: true,
        min: 0
      }
    }],
    default: [],
    validate: {
      validator: function(v) {
        return v.length > 0; // At least one variant required
      },
      message: 'At least one variant is required'
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  metadata: {
    type: Object,
    default: {}
  }
}, {
  timestamps: true
});

// Index for better query performance
ProductSchema.index({ category: 1, isActive: 1 });
ProductSchema.index({ 'variants.duration': 1 });

// Virtual for getting the base price (lowest variant price)
ProductSchema.virtual('basePrice').get(function() {
  if (this.variants.length === 0) return 0;
  return Math.min(...this.variants.map(v => v.price));
});

// Ensure virtual fields are serialized
ProductSchema.set('toJSON', { virtuals: true });

delete mongoose.connection.models?.Product;

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);