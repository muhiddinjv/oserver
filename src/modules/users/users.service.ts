import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './user.schema';
import { hashPassword } from 'src/utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) { }

  async create(user: CreateUserDto): Promise<UserDocument> {
    const userExists = await this.userModel.exists({ phoneNumber: user.phoneNumber }).lean();
    if (userExists) {
      throw new ConflictException(`User with that phone number already exists`);
    }
    const passwordHash = await hashPassword(user.password)
    const userToCreate = { ...user, password: passwordHash };

    const createdUser = new this.userModel(userToCreate);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async findOne(phoneNumber: string) {
    try {
      const user = await this.userModel.findOne({ phoneNumber });
      if (!user) {
        throw new Error(`User with the phone number ${phoneNumber} not found`);
      }
      return user;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  async remove(id: string): Promise<UserDocument> {
    return this.userModel.findByIdAndDelete(id);
  }
}
