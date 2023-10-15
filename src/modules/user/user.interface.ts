import { Document, Types } from 'mongoose';
import { Role } from 'src/common/role.enum';

export interface IUser extends Document {
    readonly firstName: string;
    readonly lastName: string;
    readonly businessName: string;
    readonly address: string;
    readonly city: string;
    readonly region: string;
    readonly email: string | null;
    readonly password: string | null;
    readonly refreshToken: string;
    readonly phoneNumber: string;
    readonly role: Role;
    readonly shopId: Types.ObjectId;
    readonly isActive: boolean;
    readonly photo: string;
    readonly userQRCode: string;
    readonly note: string;
    readonly firstVisit: Date;
    readonly lastVisit: Date;
    readonly totalVisits: number;
    readonly totalSpent: number;
    readonly totalPoints: number;
}