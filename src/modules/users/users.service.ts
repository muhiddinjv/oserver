import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Business, BusinessDocument } from '../business/business.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Business.name) private businessModel: Model<BusinessDocument>
  ) { }

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const userExists = await this.findByPhoneNumber(
      createUserDto.phoneNumber,
    );
    if (userExists) {
      throw new BadRequestException('User already exists');
    }
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async createUser(createUserDto: CreateUserDto) {
    const userExists = await this.findByPhoneNumber(
      createUserDto.phoneNumber,
    );
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const createdUser = new this.userModel(createUserDto);
    return createdUser.save()
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }
  
  async findbusinessByownerId(id:string)  {
    return await this.businessModel.findOne({ owner:id})
  }



  async findById(id: string): Promise<UserDocument> {
    return this.userModel.findById(id);
  }

  async findByPhoneNumber(phoneNumber: string): Promise<UserDocument> {
    return this.userModel.findOne({ phoneNumber }).exec();
  }

  async findByPinCode(PinCode: string): Promise<UserDocument> {
    return this.userModel.findOne({ userQrCode:PinCode }).exec();
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<UserDocument> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
