import Application from "dok-js/dist/web/Application";
import path from "path";

const app = new Application({
  basePath: path.join(__dirname, ".."),
  id: "example-server"
});
app.run();

export default app;