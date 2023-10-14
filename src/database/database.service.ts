import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class DatabaseService {
    // constructor(@InjectModel('YourModelName') private readonly yourModel: Model<YourModelType>) { }
}