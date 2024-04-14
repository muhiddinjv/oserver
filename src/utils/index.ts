import * as bcrypt from 'bcryptjs';


export async function hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }
  
  export async function validatePassword(plainPassword: string, hashedPassword: string) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }


export function parseJwt(token: any) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}
//const {sub} = parseJwt(req.headers.authorization)