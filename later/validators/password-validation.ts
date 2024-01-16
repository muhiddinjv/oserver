import { BadRequestException} from '@nestjs/common';

const validatePassword = (password: string) => {
    const passwordPattern =
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
 
    if (!passwordPattern.test(password)) {
      throw new BadRequestException(
        'Password must contain min 1 number, 1 upper+lowercase letter, 8+ characters',
      );
    }
}

export default validatePassword;