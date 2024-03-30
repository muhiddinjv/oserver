import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './user.schema';

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
    const createdUser = new this.userModel(user);
    return createdUser.save();
    /*
    const passwordHash = await hash(user.password, 10);
    const userToCreate: User = { ...user, userId: randomUUID(), password: passwordHash };
    return this.userModel.create(userToCreate);
    */
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async findOne(phoneNumber: string): Promise<User> {
    const user = await this.userModel.findOne({ phoneNumber });
    if (!user) {
      throw new NotFoundException(`User with the phone number ${user.phoneNumber} not found`);
    }
    return user;
  }

  async findByPinCode(PinCode: string): Promise<UserDocument> {
    return this.userModel.findOne({ user_pincode: PinCode });
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
