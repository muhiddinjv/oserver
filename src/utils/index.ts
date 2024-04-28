import * as argon2 from 'argon2';

export function hashData(data: string) {
  return argon2.hash(data);
}
  
export function validate(hashed: string, value: string) {
  return argon2.verify(hashed, value);
}

export function parseJwt(token: any) {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}
//const {sub} = parseJwt(req.headers.authorization)