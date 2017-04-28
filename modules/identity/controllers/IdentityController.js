import Controller from "dok-js/dist/web/Controller";
import SignInForm from "../data-models/SignInForm";

export default class IdentityController extends Controller {

  async indexAction(ctx) {
    const data = {};
    data.meta = {
      title: "Авторизация"
    };

    if (ctx.method === "POST") {
      const signInForm = new SignInForm();
      signInForm.load(ctx.body);
      const $user = await signInForm.login(ctx);
      if ($user) {
        return this.redirectTo("/", 301);
      }
      data.signInForm = signInForm;
    }

    return this.render("sign-in", data);
  }

  logoutAction(ctx) {
    ctx.session.clearSession();
    return this.redirectTo("/", 302);
  }

}