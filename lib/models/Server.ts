import mongoose, { Schema } from 'mongoose';
import { StatusType } from '../types';

const ServerSchema = new Schema(
  {
    name: { type: String, required: true },
    model: { type: String, required: true },
    brand: { type: String, required: true },
    totalCapacityGB: { type: Number, required: true },
    usedCapacityGB: { type: Number, default: 0 },
    location: { type: String, required: true },
    rackNumber: { type: String },
    ipAddress: { type: String, required: true },
    status: { type: String, enum: Object.values(StatusType), default: StatusType.ACTIVE, required: true },
    notes: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret: any) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const Server = mongoose.models.Server || mongoose.model('Server', ServerSchema);
