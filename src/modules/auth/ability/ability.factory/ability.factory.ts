import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { User } from "src/modules/users/user.schema";

export enum Action {
    Manage = 'manage',
    Create = 'create',
    Read = 'read',
    Update = 'update',
    Delete = 'delete',
}

export type Subjects = any;

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class AbilityFactory {
    defineAbility(user) {
        const { can, cannot, build } = new AbilityBuilder(Ability)
        if (user.role == "merchant") {
            can(Action.Manage, "All")
        }
        else {
            can(Action.Read, "All")
        }
        return build({
            detectSubjectType: (item) => 
            item.constructor as ExtractSubjectType<Subjects>
            
        })
    }
 }
