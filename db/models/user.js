"use strict";
const { Model, Sequelize, DataTypes } = require("sequelize");
const bcrypt = require('bcrypt');
const sequelize = require("../../config/database");
const AppError = require("../../utils/appError");
const project = require("./project");
const user = sequelize.define('user', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  userType: {
    type: DataTypes.ENUM("0", "1", "2"),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'userType cannot be null',
      },
      notEmpty: {
        msg: 'userType can not be empty'
      }
    }
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'firstName can not be null',
      },
      notEmpty: {
        msg: 'firstName can not be empty'
      }
    }
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'lastName can not be null',
      },
      notEmpty: {
        msg: 'lastName can not be empty'
      }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'email can not be null',
      },
      notEmpty: {
        msg: 'email can not be empty'
      },
      isEmail: {
        msg: 'Invalid email id',
      }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'password can not be null',
      },
      notEmpty: {
        msg: 'password can not be empty'
      },
    }
  },
  confirmPassword: {
    type: DataTypes.VIRTUAL,
    set(value) {
      if(this.password.length < 7){
        throw new AppError('Password length must be grater than 7', 400)
      }
      if (value === this.password) {
        const hashPassword = bcrypt.hashSync(value, 10);
        this.setDataValue('password', hashPassword);
      } else {
        throw new AppError("Password and Confirm Password must be same", 400);
      }
    }
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  deletedAt: {
    type: DataTypes.DATE
  }
}, {
  paranoid: true,
  freezeTableName: true,
  modelName: 'user'
});

user.hasMany(project, {foreignKey: 'createdBy'})
project.belongsTo(user, {foreignKey: 'createdBy'})

module.exports = user;
