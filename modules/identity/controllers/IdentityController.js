import Controller from "dok-js/dist/web/Controller";
import SignInForm from "../data-models/SignInForm";
import App from "dok-js";

export default class IdentityController extends Controller {

  async indexAction(ctx) {
    const data = {};
    data.meta = {
      title: "Авторизация"
    };

    if (ctx.method === "POST") {
      const signInForm = new SignInForm();
      signInForm.load(ctx.body);
      const $user = await signInForm.login();
      if ($user) {
        const Session = App().getService("Session");
        return this.redirectTo("/", 301, {
          "Set-Cookie": [Session.getSessionCookie($user)]
        });
      }
      data.signInForm = signInForm;
    }

    return this.render("sign-in", data);
  }

}