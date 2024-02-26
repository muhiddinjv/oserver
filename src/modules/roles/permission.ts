// import { AbilityBuilder, PureAbility } from "@casl/ability";

// // Define roles
// export enum Role {
//     User = 'user',
//     Admin = 'admin',
//   }
  
//   // Define abilities
//   export const defineAbilitiesFor = (user:any) => {
//     const { can, cannot, rules } = new AbilityBuilder();
  
//     if (user.role === Role.User) {
//       can('read', 'Product', { userId: user.id });
//     }
  
//     if (user.role === Role.Admin) {
//       can('read', 'Product');
//     }
  
//     return new PureAbility(rules);
//   };
  
//   // Middleware to check permissions
//   export const checkPermissions = (ability) => (action, subject) => (req, res, next) => {
//     if (!ability.can(action, subject)) {
//       return res.status(403).json({ message: 'Unauthorized' });
//     }
//     next();
//   };
