import mongoose, { Schema } from 'mongoose';
import { CompanyType, StatusType } from '../types';

const CompanySchema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, enum: Object.values(CompanyType), required: true },
    email: { type: String, required: true },
    address: { type: String },
    status: { type: String, enum: Object.values(StatusType), default: StatusType.ACTIVE, required: true },
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

export const Company = mongoose.models.Company || mongoose.model('Company', CompanySchema);
