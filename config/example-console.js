import mainConfig from "./example-server";

export default function () {
  const config = mainConfig();

  config.default.services.Router.options.routes = {
    "COMMAND migrate:<action:up|down|create>": {
      module: "migration",
      controller: "index"
    }
  };

  return config;
}