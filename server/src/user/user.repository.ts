import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { UpdateUserRequestDTO } from './dto/update-user-request.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async findAll(
    page?: number, 
    size?: number
  ):Promise<{ data: User[]; total: number }> {
    let data, total;
    if (page && size) {
      const skip = (page - 1) * size;
      data = await this.userModel.find().skip(skip).limit(size).exec();
    } else {
      data = await this.userModel.find().exec();
    }

    total = await this.userModel.countDocuments().exec();
    return {data, total};
  }

  

  findById(id: string) {
    return this.userModel.findById(id);
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  update(id: string, updateUserDto: UpdateUserRequestDTO) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  async addBalance(id: string, amount: number) {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException('User not found');
    user.balance += amount;
    return user.save();
  }

  async deleteUser(id: string) {
    await this.userModel.findByIdAndDelete(id);
  }

  count(): Promise<number> {
    return this.userModel.countDocuments();
  }

  async increaseBalance(userId: string, amount: number) {
    return this.userModel.findByIdAndUpdate(userId, { $inc: { balance: amount } });
  }

  async decreaseBalance(userId: string, amount: number) {
    return this.userModel.findByIdAndUpdate(userId, { $inc: { balance: -amount } });
  }

}
