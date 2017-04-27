import DataTypes from "sequelize/lib/data-types";
import App from "dok-js";
import UserModel from "./UserModel";
import PermissionModel from "./PermissionModel";

const STATUS_ACTIVE = "active";
const STATUS_BLOCKED = "blocked";

export default App().defineModel("RoleModel", {
  name: {
    type: DataTypes.STRING(64),
    allowNull: false,
    unique: true
  },

  status: {
    type: DataTypes.ENUM(STATUS_ACTIVE, STATUS_BLOCKED),
    defaultValue: STATUS_ACTIVE,
    allowNull: false
  }
}, {
  classMethods: {
    STATUS_ACTIVE,
    STATUS_BLOCKED,
    associate: function ({RoleModel}) {
      RoleModel.belongsToMany(UserModel, {
        through: "tbl_user_has_role",
        foreignKey: "roleId",
        otherKey: "userId"
      });
      RoleModel.belongsToMany(PermissionModel, {
        through: "tbl_role_has_permission",
        foreignKey: "roleId",
        otherKey: "permissionId"
      });
    }
  },
  tableName: "tbl_role",
  name: {
    singular: "role",
    plural: "roles"
  }
});
