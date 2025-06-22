import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Booking {
  _id: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Tour', required: true })
  tour_id: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'Activity', default: [] })
  signed_activities: Types.ObjectId[];

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  bookFor: string;

  @Prop({ required: true })
  guestSize: number;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
