import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/modules/user/user.interface';

@Injectable()
export class DatabaseService {
    constructor(@InjectModel('User') private readonly yourModel: Model<IUser>) { }
}