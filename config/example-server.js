import path from "path";
export default function () {
  return {
    default: {
      basePath: path.join(__dirname, ".."),
      services: {
        Database: {
          options: {
            instances: {
              db: {
                database: "example",
                username: "example",
                password: "example",
                params: {
                  host: "localhost",
                  dialect: "postgres"
                }
              }
            }
          }
        },
        Server: {
          options: {
            port: 1987
          }
        },
        Router: {
          options: {
            routes: {
              "/": {
                module: "dashboard",
                controller: "index",
                action: "index"
              },
              "/login": {
                module: "identity",
                controller: "identity",
                action: "index"
              },
              "/logout": {
                module: "identity",
                controller: "identity",
                action: "logout"
              },
              "GET /assets/<filePath:.*>": {
                module: "static",
                controller: "static",
                action: "index",
                params: {
                  viewPath: path.join(__dirname, "..", "views", "assets")
                }
              },
              "/<module:\w+>/<controller:\w+>/<action:\w+>": {}
            }
          }
        }
      },
      modules: {
        identity: {
          path: path.join(__dirname, "..", "modules", "identity", "IdentityModule")
        },
        dashboard: {
          path: path.join(__dirname, "..", "modules", "dashboard", "DashboardModule")
        }
      }
    }
  };
}