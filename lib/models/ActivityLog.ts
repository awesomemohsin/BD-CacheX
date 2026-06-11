import mongoose, { Schema } from 'mongoose';

const ActivityLogSchema = new Schema(
  {
    action: { type: String, required: true },
    entity: { type: String, required: true },
    details: { type: String, required: true },
    userEmail: { type: String, required: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
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

export const ActivityLog =
  mongoose.models.ActivityLog || mongoose.model('ActivityLog', ActivityLogSchema);
