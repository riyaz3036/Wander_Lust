// tour.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Tour {
  _id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  location: string;

  @Prop({ default: null })
  image: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  duration: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  capacity: number;

  @Prop({ required: true })
  vacancy: number;

  @Prop({ required: true })
  start_date: Date;
}

export const TourSchema = SchemaFactory.createForClass(Tour);