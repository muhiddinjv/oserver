import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import * as bcryptjs from 'bcryptjs';
import { AuthDto } from './dto/auth.dto';
import { PassworgDto } from './dto/password.dto';
import { SendSmsDto } from './dto/send-sms.dto';
import { BusinessService } from '../business/business.service';
import { SingUpUserDto } from '../users/dto/singup-user.dto';
import { validatePhoneNumber, validateEmail, validatePassword } from '../../validators';
import { SmsService } from '../sms/sms.service';
import { generateRandomCode, hashData } from 'src/helpers';
import { JwtTokenService } from './jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtTokenService: JwtTokenService,
    private infobipService: SmsService,
    private businessService: BusinessService,
  ) { }

  async signUp(createUserDto: CreateUserDto): Promise<any> {
    // Check if user exists
    const userExists = await this.userService.findByPhoneNumber(
      createUserDto.phone_number,
    );
    if (userExists) {
      throw new BadRequestException('User already exists');
    }
    // Password Validation
    validatePassword(createUserDto.password)

    // phone_number Validation
    const isValid = validatePhoneNumber(createUserDto.phone_number);

    if (!isValid) {
      throw new BadRequestException('Invalid phone number');
    }
    // email Validation
    if (createUserDto.email) {
      const userExists = await this.userService.findByEmail(
        createUserDto.email,
      );

      if (userExists) {
        throw new BadRequestException('User already exists');
      }

      if (!validateEmail(createUserDto.email.toString())) {
        throw new BadRequestException('Invalid email');
      }
    }

    // Hash password
    const hash = await hashData(createUserDto.password);

    if (!createUserDto.business_name) {
      throw new BadRequestException('Business name is required.');
    }

    const business = await this.businessService.create({
      name: createUserDto.business_name,
    });

    const newUser = await this.userService.create({
      ...createUserDto,
      business: business?.id,
      password: hash,
    });
    await this.businessService.update(business.id, { owner: newUser.id });

    const tokens = await this.jwtTokenService.getTokens(newUser._id, newUser.phone_number);
    await this.jwtTokenService.updateRefreshToken(newUser._id, tokens.refresh_token);

    const response = {
      message: "User successfully signed in",
      data: {
        id: newUser._id,
        name: `${newUser.first_name} ${newUser.last_name}`,
        role: newUser.role,
        phone: newUser.phone_number,
        tokens
      }

    }
    return response;
  }

  async signIn(data: AuthDto) {
    // Check if user exists
    const user = await this.userService.findByPhoneNumber(data.phone_number);
    console.log(user)
    if (!user) throw new BadRequestException('User does not exist');

    // phone_number Validation
    const isValid = validatePhoneNumber(data.phone_number);

    if (!isValid) {
      throw new BadRequestException('Invalid phone number');
    }

    const passwordMatches = await bcryptjs.compare(
      data.password,
      user.password,
    );

    if (!passwordMatches) {
      throw new BadRequestException('Password is incorrect');
    }
    const tokens = await this.jwtTokenService.getTokens(user._id, user.phone_number);
    await this.jwtTokenService.updateRefreshToken(user._id, tokens.refresh_token);

    const response = {
      message: "User successfully signed in",
      data: {
        id: user._id,
        name: `${user.first_name} ${user.last_name}`,
        role: user.role,
        phone: user.phone_number,
        tokens
      }
    }
    
    return response;
  }

  // async getuserbynumber(phone_number: string) {
  //   // phone_number Validation
  //   const isValid = validatePhoneNumber(phone_number);

  //   if (!isValid) {
  //     throw new BadRequestException('Invalid phone number');
  //   }

  //   const userExists = await this.userService.findByPhoneNumber(phone_number);
  //   if (userExists) {
  //     throw new BadRequestException('User already exists');
  //   }
  // }

  async sendSmsNumber(sendSmsDto: SendSmsDto) {
    const code = generateRandomCode(6);

    const userExists = await this.userService.findByPhoneNumber(
      sendSmsDto.phone_number,
    );
    if (userExists) {
      throw new BadRequestException('User already exists');
    }
    await this.infobipService.sendSMS(
      sendSmsDto.phone_number,
      `Authorization code :${code}`,
    );

    return {
      success: true,
      code: code,
    };
  }

  async signOut(userId: string) {
    this.userService.update(userId, { refresh_token: null });
    return {
      message: "User successfully signed out"
    }
  }

  async ResetPassword(phone_number: string) {
    const userExists = await this.userService.findByPhoneNumber(phone_number);
    if (!userExists) {
      throw new BadRequestException(
        "user with given phone number doesn't exist",
      );
    }

    const tokens = await this.jwtTokenService.getTokens(userExists._id, userExists.phone_number);

    const link = `http://localhost:3000/password-reset?token=${tokens.accessToken}`;

    await this.infobipService.sendSMS(phone_number, `Reset password : ${link}`);

    await this.jwtTokenService.updateRefreshToken(userExists._id, tokens.refresh_token);

    return {
      success: true,
      message: 'We sent a link to your number via sms to reset your password',
    };
  }

  async NewPassword(token: string, PassworgDto: PassworgDto) {
    const newToken = await this.jwtTokenService.getTokenById(token);
    if (!newToken) {
      throw new BadRequestException('Invalid link or expired');
    }
    const userId = newToken['sub'];

    validatePassword(PassworgDto.password)

    if (PassworgDto.password != PassworgDto.passwordConfig) {
      throw new BadRequestException('password config is incorrect');
    }
    const hash = await hashData(PassworgDto.password);
    await this.userService.update(userId, { password: hash });

    return {
      success: true,
      message: 'password successful changed',
    };
  }

  async createUser(createUserDto: SingUpUserDto, userId: string) {
    // phone_number Validation
    const isValid = validatePhoneNumber(createUserDto.phone_number);
    if (!isValid) {
      throw new BadRequestException('Invalid phone number');
    }

    const userExists = await this.userService.findByPhoneNumber(
      createUserDto?.phone_number,
    );
    if (userExists) {
      throw new BadRequestException('User already exists');
    }
    const owner = await this.userService.findById(userId);
    const Business = await this.businessService.findbusinessbyOwnerId(userId);
    const newUser = await this.userService.create({
      ...createUserDto,
      business: Business?.id,
    });

    Business.staff.push(newUser._id);
    Business.save();

    const tokens = await this.jwtTokenService.getTokens(newUser._id, newUser.phone_number);
    await this.jwtTokenService.updateRefreshToken(newUser._id, tokens.refresh_token);
    const link = `http://localhost:3000/password-reset?token=${tokens.accessToken}`;

    await this.infobipService.sendSMS(
      createUserDto?.phone_number,
      `
    ${owner?.first_name} invites you to join your organization and obtain access to the Loyverse back office. : ${link}
    your pincode:${createUserDto?.user_qr_code}
    `,
    );

    return newUser;
  }

  async validateUserById(userId: string) {
    const user = await this.userService.findById(userId).catch(() => {
      throw new BadRequestException('Valid token with non-existent user.');
    });
    return user;
  }

  async sendPinCode() {
    const code = generateRandomCode(4);
    return {
      seccess: true,
      code,
    };
  }
}
