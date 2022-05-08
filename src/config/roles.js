const allRoles = {
  user: [],
  admin: ['getUsers', 'manageUsers','MANAGE_ALL_CATEGORIES','MANAGE_ALL_DISPLAY'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
