import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUsersDto } from './dto/get-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(data: CreateUserDto) {
    const productData = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const userByEmail = await this.userModel
      .findOne({ email: productData.email })
      .exec();
    const userByUserName = await this.userModel
      .findOne({ userName: productData.userName })
      .exec();

    if (userByEmail) {
      throw new BadRequestException('Email already exists');
    }

    if (userByUserName) {
      throw new BadRequestException('Username already exists');
    }

    const newProduct = new this.userModel(productData);
    const userInfo = await newProduct.save();

    return {
      message: 'User created successfully',
      userInfo,
    };
  }

  async findAll(params: GetUsersDto) {
    if (!params) {
      const response = await this.userModel
        .aggregate([{ $project: { password: 0 } }])
        .facet({
          records: [{ $limit: 50 }],
          pageInfo: [{ $group: { _id: null, totalRecords: { $sum: 1 } } }],
        });

      return response[0];
    }

    const { page = 1, count = 50 } = params;

    const response = await this.userModel
      .aggregate([{ $project: { password: 0 } }])
      .facet({
        records: [{ $skip: (page - 1) * count }, { $limit: count }],
        pageInfo: [{ $group: { _id: null, totalRecords: { $sum: 1 } } }],
      });

    return response[0];
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`user #${id} not found`);
    }

    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.userModel
      .aggregate([{ $match: { email: email } }])
      .exec();

    if (!user) {
      throw new NotFoundException(`user not found`);
    }

    return user[0];
  }

  async findOneByUserName(userName: string) {
    const user = await this.userModel
      .aggregate([{ $match: { userName: userName } }])
      .exec();

    if (!user) {
      throw new NotFoundException(`user not found`);
    }

    return user[0];
  }

  async update(
    id: string,
    data: {
      name?: string;
      lastName?: string;
      userName?: string;
      email?: string;
      password?: string;
    },
  ) {
    const changes = { ...data, updatedAt: new Date() };
    const userByEmail = await this.userModel
      .findOne({ email: data.email })
      .exec();
    const userByUserName = await this.userModel
      .findOne({ userName: data.userName })
      .exec();

    if (userByEmail) {
      throw new BadRequestException('Email already exists');
    }

    if (userByUserName) {
      throw new BadRequestException('Username already exists');
    }

    const user = await this.userModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async remove(id: string) {
    const user = await this.userModel.findByIdAndDelete(id).exec();

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return {
      message: `User deleted`,
    };
  }
}
