import { defineAbility } from '@casl/ability';

export default (user) => defineAbility((can) => {
  can('read', 'Article');

  if (user.isSignedIn) {
    can('update', 'Article', { userId: user.id });
    can('create', 'Comment');
    can('update', 'Comment', { userId: user.id });
  }
});