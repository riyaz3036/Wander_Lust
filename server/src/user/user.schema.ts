import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserMembershipEnum } from './enum/user-membership.enum';
import { Role } from 'src/common/enums/access-role.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  _id: Types.ObjectId;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false })
  phone: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: null })
  image: string;

  @Prop({ default: 0 })
  balance: number;

  @Prop({
    type: String,
    enum: UserMembershipEnum,
    default: UserMembershipEnum.GENERAL,
  })
  membership: UserMembershipEnum;

  @Prop({
    type: String,
    enum: Role,
    default: Role.USER,
  })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
