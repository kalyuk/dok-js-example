import DataModel from "dok-js/dist/base/DataModel";
import UserModel from "../models/UserModel";
import App from "dok-js";
export default class SignInForm extends DataModel {

  email = null;
  password = null;
  rememberMe = true;

  rules() {
    return [
      [["email", "password"], "required", {message: "Поле нужно заполнить"}],
      [["email"], "isEmail", {message: "Email введен не корректно"}],
      [["rememberMe"], "isBoolean", {message: "only boolean"}]
    ];
  }

  async login(ctx) {
    await this.validate();

    if (!this.hasErrors()) {
      const user = await UserModel.findOne({where: {email: this.email}});
      if (user && App().getService("Security").hashVerify(this.password, user.passwordHash)) {
        ctx.session.set("user", user);
        const roles = await user.getRoleList();
        ctx.session.set("roles", roles);
        return user;
      }

      this.addError("email", "check-user", "Ошибка при вводе email или пароля");
    }

    return false;
  }

}