import DataTypes from "sequelize/lib/data-types";
import App from "dok-js";
import RoleModel from "./RoleModel";

const STATUS_NEW = "new";
const STATUS_BLOCKED = "blocked";

export default App().defineModel("UserModel", {
  email: {
    type: DataTypes.STRING(64),
    allowNull: false,
    unique: true
  },

  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false
  },

  password: {
    type: DataTypes.VIRTUAL,
    set: function (val) {
      this.setDataValue("password", val);
      const hash = App().getService("Security").getHash(val);
      this.setDataValue("passwordHash", hash);
    }
  },

  status: {
    type: DataTypes.ENUM(STATUS_NEW, STATUS_BLOCKED),
    defaultValue: STATUS_NEW,
    allowNull: false
  }
}, {
  classMethods: {
    STATUS_NEW,
    STATUS_BLOCKED,
    associate: function ({UserModel}) {
      UserModel.belongsToMany(RoleModel, {
        through: "tbl_user_has_role",
        foreignKey: "userId",
        otherKey: "roleId"
      });
    }
  },
  instanceMethods: {
    getRoleList: async function () {
      if (!this.$roles) {
        this.$roles = await this.getRoles();
      }
      return this.$roles.map(role => role.name);
    }
  },
  tableName: "tbl_user",
  name: {
    singular: "user",
    plural: "users"
  }
});
