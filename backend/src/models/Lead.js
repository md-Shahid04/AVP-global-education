import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      default: 'Admin',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
);

const leadSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      index: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      index: true,
    },
    address: {
      street: { type: String, trim: true, default: '' },
      city: { type: String, required: [true, 'City is required'], trim: true },
      state: { type: String, required: [true, 'State is required'], trim: true },
      postalCode: { type: String, required: [true, 'Postal code is required'], trim: true },
    },
    college: {
      type: String,
      required: [true, 'College selection is required'],
      trim: true,
      index: true,
    },
    course: {
      type: String,
      required: [true, 'Course selection is required'],
      trim: true,
      index: true,
    },
    contactPermission: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: [
        'new',
        'contacted',
        'follow-up',
        'interested',
        'application',
        'admitted',
        'rejected',
        'closed',
      ],
      default: 'new',
      index: true,
    },
    notes: [noteSchema],
    source: {
      type: String,
      default: 'website_form',
    },
    assignedTo: {
      type: String,
      default: 'Unassigned',
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for duplicate checking and performance
leadSchema.index({ email: 1, course: 1, createdAt: -1 });
leadSchema.index({ phone: 1, course: 1, createdAt: -1 });
leadSchema.index({ createdAt: -1 });

const Lead = mongoose.model('Lead', leadSchema);

export default Lead;
