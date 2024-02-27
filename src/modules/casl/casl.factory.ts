import {
    Ability,
    AbilityBuilder,
    AbilityClass,
    ExtractSubjectType,
    InferSubjects,
  } from '@casl/ability';
  import { Injectable } from '@nestjs/common';
  import { Action } from 'src/enums/action.enum';
  import { Role } from 'src/enums/roles.enum';
  import { ItemShop } from 'src/modules/items_shop/item_shop.schema';
  import { User } from 'src/modules/users/user.schema';
  // import { Status } from 'src/enums/status.enum';
  
  type Subjects = InferSubjects<typeof ItemShop | typeof User> | 'all';
  
  export type AppAbility = Ability<[Action, Subjects]>;
  
  @Injectable()
  export class CaslAbilityFactory {
    createForUser(user: User | any) {
      const { can, cannot, build } = new AbilityBuilder<
        Ability<[Action, Subjects]>
      >(Ability as AbilityClass<AppAbility>);
  
      if (user?.roles.includes(Role.Admin)) {
        can(Action.Manage, 'all'); // read-write access to everything
      }
  
      if (user?.roles.includes(Role.Wholesaler)) {
        can(Action.Create, ItemShop);
        can(Action.Update, ItemShop, { user_id: user._id });
        can(Action.Delete, ItemShop, { user_id: user._id, track_stock: false });
        can(Action.Read, ItemShop, { user_id: user._id, track_stock: false });
  
        can(Action.Read, User, {
          phone_number: user.phone_number,
        });
      }
  
      can(Action.Read, ItemShop, {
        track_stock: true,
        // status: Status.Approved,
      });
  
      if (!user) {
        cannot(Action.Read, ItemShop, {
          track_stock: false,
          // status: Status.Rejected,
        });
  
        cannot(Action.Read, ItemShop, {
          track_stock: false,
          // status: Status.Pending,
        });
      }
  
      return build({
        detectSubjectType: (item) =>
          item.constructor as ExtractSubjectType<Subjects>,
      });
    }
  }