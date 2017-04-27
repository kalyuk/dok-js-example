import UserModel from "../modules/identity/models/UserModel";

export async function up(Database) {
  await Database.getInstance("db").sync();
  await UserModel.create({
    email: "admin@shopmaek.ru",
    password: "111111"
  });
  return true;
}
export async function down() {
  await UserModel.destroy({
    where: {},
    truncate: true
  });
  return true;
}