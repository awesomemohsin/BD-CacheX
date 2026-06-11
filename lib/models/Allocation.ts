import mongoose, { Schema } from 'mongoose';
import { StatusType } from '../types';

const AllocationSchema = new Schema(
  {
    companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    cacheProviderId: { type: Schema.Types.ObjectId, ref: 'CacheProvider', required: true },
    serverId: { type: Schema.Types.ObjectId, ref: 'Server', required: true },
    capacityGB: { type: Number, required: true },
    goLiveDate: { type: Date, required: true },
    status: { type: String, enum: Object.values(StatusType), default: StatusType.ACTIVE, required: true },
    notes: { type: String },
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

export const Allocation = mongoose.models.Allocation || mongoose.model('Allocation', AllocationSchema);
