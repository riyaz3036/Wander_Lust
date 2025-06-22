import { Injectable, NotFoundException } from '@nestjs/common';
import { BookingsRepository } from 'src/booking/booking.repository';
import { deleteFile } from 'src/common/utils/file.utils';
import { TourRepository } from 'src/tour/tour.repository';
import { UpdateUserRequestDTO } from './dto/update-user-request.dto';
import { UserResponseDTO } from './dto/user-response.dto';
import { UsersRepository } from './user.repository';


@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly bookingRepository: BookingsRepository,
    private readonly tourRepository: TourRepository,
  ) {}


  /* Service function to fetch all users */
  async getAllUsers(page: number, size: number): Promise<{data: UserResponseDTO[], total: number}> {
    const users = await this.usersRepository.findAll(page, size);
    const userData =  users.data.map(user => {
      return new UserResponseDTO({
          id: user._id.toString(),
          username: user.username,
          email: user.email,
          phone: user.phone,
          password: user.password,
          image: user.image,
          balance: user.balance,
          membership: user.membership,
          role: user.role,
      })
    });

    return {data: userData, total: users.total};
  }


  /* Service function to get a user by id */
  async getUserById(id: string): Promise<UserResponseDTO> {
    const user = await this.usersRepository.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return new UserResponseDTO({
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        phone: user.phone,
        password: user.password,
        image: user.image,
        balance: user.balance,
        membership: user.membership,
        role: user.role,
    });
  }


  /* Service function to update a user by id */
  async updateUser(id: string, updateUserDto: UpdateUserRequestDTO, file?: any): Promise<UserResponseDTO> {
    const existingUser = await this.usersRepository.findById(id);
    if (!existingUser) {
        throw new NotFoundException('User not found');
    }

    if (file && existingUser.image) {
        await deleteFile(existingUser.image);
    }

    if(file){
      updateUserDto.image = file.path;
    }

    const updated = await this.usersRepository.update(id, updateUserDto);
    if (!updated) throw new NotFoundException('User not found');
    return new UserResponseDTO({
        id: updated._id.toString(),
        username: updated.username,
        email: updated.email,
        phone: updated.phone,
        password: updated.password,
        image: updated.image,
        balance: updated.balance,
        membership: updated.membership,
        role: updated.role,
    });
  }


  /* Service function to delete a user */
  async deleteUser(id: string): Promise<string> {
    const user = await this.usersRepository.findById(id);
    if (!user) throw new NotFoundException('User not found');

    if (user.image) {
        await deleteFile(user.image);
    }

    await this.bookingRepository.deleteManyByUserId(id);

    const tours = await this.tourRepository.findAll({ids: []});

    for (const tour of tours.data) {
      const tourBooking = await this.bookingRepository.findOneByTourId(tour._id);
      if (tourBooking) await this.tourRepository.update(tour._id, {vacancy: tourBooking.guestSize});
    }

    await this.usersRepository.deleteUser(id);
    return `User with id ${id} deleted successfully.`; 
  }
}
