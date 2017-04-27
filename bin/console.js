import Application from "dok-js/dist/console/Application";
import path from "path";

const app = new Application({
  basePath: path.join(__dirname, ".."),
  id: "example-console"
});
app.run();

export default app;