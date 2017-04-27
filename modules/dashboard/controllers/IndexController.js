import Controller from "dok-js/dist/web/Controller";
import AccessControl from "dok-js/dist/behaviors/AccessControl";
export default class IndexController extends Controller {

  getBehaviors() {
    return [{
      behavior: AccessControl,
      options: [{
        actions: ["index"],
        roles: ["user"]
      }]
    }];
  }

  indexAction() {
    return this.render("index");
  }
}