import UserModel from "../modules/identity/models/UserModel";
import RoleModel from "../modules/identity/models/RoleModel";

export async function up(Database) {
  await Database.getInstance("db").sync();
  const user = await UserModel.find({where: {email: "admin@admin.local"}});
  const adminRole = await RoleModel.create({name: "administrator"});
  const userRole = await RoleModel.create({name: "user"});

  await user.addRoles([adminRole, userRole]);


  return true;
}
export async function down(Database) {
  return true;
}