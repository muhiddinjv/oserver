import * as bcryptjs from "bcryptjs";

export class AuthenticationProvider {
    static async generateHash(password: string): Promise<string> {
        return bcryptjs.hash(password, 10);
    }
}