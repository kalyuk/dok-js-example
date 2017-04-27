import DataTypes from "sequelize/lib/data-types";
import App from "dok-js";
import RoleModel from "./RoleModel";

export default App().defineModel("PermissionModel", {
  name: {
    type: DataTypes.STRING(64),
    allowNull: false,
    unique: true
  }
}, {
  classMethods: {
    associate: function ({PermissionModel}) {
      PermissionModel.belongsToMany(RoleModel, {
        through: "tbl_role_has_permission",
        foreignKey: "permissionId",
        otherKey: "roleId"
      });
    },
  },
  tableName: "tbl_permission",
  name: {
    singular: "permission",
    plural: "permissions"
  }
});
