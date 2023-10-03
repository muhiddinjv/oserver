import { BeforeInsert, Column, Entity, Index, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { Model, Address, ProductWarehouse, Categories, Roles, Regions } from "../../entities";
import bcrypt from 'bcryptjs';
import * as crypto from "crypto";

@Entity("Users")
export class Users extends Model {
    @Column({ nullable: true })
    username: string;

    @Column({ nullable: true })
    firstname: string;

    @Column({ nullable: true })
    lastname: string;

    @Column()
    businessname: string;

    @Index('email_index')
    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    phone: string;

    @ManyToOne((type) => Regions, (data) => data.user)
    region: Regions[];

    @Column({ default: true })
    isActive: boolean;

    @Column({
        default: 'default.png',
    })
    photo: string;

    @OneToMany((type) => Address, (addr) => addr.address)
    address: Address[]

    @OneToMany((type) => ProductWarehouse, (productwarehouse) => productwarehouse.user)
    productwarehouses: ProductWarehouse[]

    @OneToMany((type) => Categories, (categories) => categories.user)
    categroies: Categories[]

    @ManyToMany((type) => Roles, (role) => role.users)
    @JoinTable({ name: 'UserRoles' })
    roles: Roles[];

    @BeforeInsert()
    async hashPassword() {
        this.password = await crypto.createHmac('sha256', this.password).digest('hex');
    }
    static async comparePasswords(
        candidatePassword: string,
        hashedPassword: string
    ) {
        return await bcrypt.compare(candidatePassword, hashedPassword);
    }

    toJSON() {
        return {
            ...this,
            password: undefined,
            verified: undefined,
            verificationCode: undefined,
        };
    }
}
