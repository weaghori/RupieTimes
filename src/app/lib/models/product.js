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
        trim: true
      },
      durationMonths: {
        type: Number,
        required: true,
        min: 1
      },
      price: {
        type: Number,
        required: true,
        min: 0
      },
      description: {
        type: String,
        trim: true,
        default: ''
      }
    }],
    default: [],
    validate: {
      validator: function(v) {
        return v.length > 0;
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
  articles: [{
    title: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String,
      required: true
    },
    image: {
      filename: String,
      contentType: String,
      size: Number,
      gridfsId: String
    },
    order: {
      type: Number,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  }],
  metadata: {
    type: Object,
    default: {}
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index for better query performance
ProductSchema.index({ category: 1, isActive: 1 });
ProductSchema.index({ 'variants.duration': 1 });
ProductSchema.index({ 'variants.durationMonths': 1 });
ProductSchema.index({ 'articles.isActive': 1 });

// Virtual for getting the base price (lowest variant price)
ProductSchema.virtual('basePrice').get(function() {
  if (!this.variants || this.variants.length === 0) return 0;
  const validVariants = this.variants.filter(v => v && typeof v.price === 'number' && !isNaN(v.price));
  if (validVariants.length === 0) return 0;
  return Math.min(...validVariants.map(v => v.price));
});

// Method to sort variants by duration months
ProductSchema.methods.sortVariants = function() {
  if (this.variants && this.variants.length > 0) {
    this.variants.sort((a, b) => a.durationMonths - b.durationMonths);
  }
  return this;
};

// Pre-save middleware to sort variants
ProductSchema.pre('save', function(next) {
  if (this.variants && this.variants.length > 0) {
    this.variants.sort((a, b) => a.durationMonths - b.durationMonths);
  }
  next();
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);