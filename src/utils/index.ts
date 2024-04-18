import * as bcrypt from 'bcryptjs';

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(password, salt);
}
  
export async function validate(value: string, hashed: string) {
  return bcrypt.compare(value, hashed);
}

export function parseJwt(token: any) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}
//const {sub} = parseJwt(req.headers.authorization)