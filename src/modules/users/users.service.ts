import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './dto/create-user.dto';
import { SignInDto } from "../auth/signin.dto";
import { SignInVeryfyDto } from "../auth/signin.verify.dto";
import { Regions, Roles, Users } from '../entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) { }

  async insertSystemAdmin(userDto: UserDto): Promise<Users> {
    return await this.userRepository.save(userDto);
  }

  async findAll() {
    return await this.userRepository.find({ relations: ['roles'] });
  };

  async create(user: UserDto): Promise<Users> {
    return await this.userRepository.save(user);
  }


  async findByEmail(email: string): Promise<Users> {
    return await this.userRepository.findOne({
      where: {
        email: email
      }
    })
  }

  async findByUser(signInDto: SignInDto) {
    return await this.userRepository.findOne({
      relations: ['roles', 'roles.permission'],
      where: {
        username: signInDto.username
      }
    })
  }

  async login(singInDto: SignInDto): Promise<Users[]> {
    return await this.userRepository.find({ where: { username: singInDto.username, password: singInDto.password, isActive: true } });
  }

  async loginByEmailOrPhone(singInDto: SignInVeryfyDto): Promise<Users[]> {
    return await this.userRepository.createQueryBuilder("users").where('phone=:phone', { phone: singInDto.emailorphone }).orWhere('email=:mail', { mail: singInDto.emailorphone }).getMany();
  }

  fillUserData = async () => {
    let region, roles;
    this.userRepository.manager.getRepository(Regions).find({ where: { name: 'Toshkent shahri' } }).then((data) => {
      data.map((val, key) => {
        region = val.name;
      })
    });
    roles = await this.userRepository.manager.getRepository(Roles).find({ where: { role_name: 'Seller' } });
    return
  }
}
