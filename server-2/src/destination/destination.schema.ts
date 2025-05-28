import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Destination {
  _id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ type: Types.ObjectId, ref: 'Tour', required: true })
  tour_id: Types.ObjectId;

  @Prop({ default: null })
  image: string;

  @Prop({ required: true })
  description: string;
}

export const DestinationSchema = SchemaFactory.createForClass(Destination);
