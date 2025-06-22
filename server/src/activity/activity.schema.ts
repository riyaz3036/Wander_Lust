import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Activity {
  _id: string;
  
  @Prop({ required: true })
  title: string;

  @Prop({ type: Types.ObjectId, ref: 'Destination', required: true })
  dest_id: Types.ObjectId;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  description: string;
}

export type ActivityDocument = HydratedDocument<Activity>;
export const ActivitySchema = SchemaFactory.createForClass(Activity);
