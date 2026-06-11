import mongoose, { Schema } from 'mongoose';
import { StatusType } from '../types';

const CacheProviderSchema = new Schema(
  {
    name: { type: String, required: true },
    shortCode: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: Object.values(StatusType), default: StatusType.ACTIVE, required: true },
    serverCount: { type: Number, default: 0 },
    totalCapacity: { type: Number, default: 0 },
    usedServerCount: { type: Number, default: 0 },
    usedCapacity: { type: Number, default: 0 },
    createdBy: { type: String, default: 'system@bdcache.com' },
    updatedBy: { type: String, default: 'system@bdcache.com' },
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

export const CacheProvider =
  mongoose.models.CacheProvider || mongoose.model('CacheProvider', CacheProviderSchema);
