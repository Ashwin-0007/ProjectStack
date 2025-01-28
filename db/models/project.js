const sequelize = require("../../config/database");

module.exports = sequelize.define('project', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'title can not be null',
      },
      notEmpty: {
        msg: 'title can not be empty'
      },
    }
  },
  isFeatured: {
    type: Sequelize.STRING,
    defaultValue: false,
    allowNull: false,
    validate: {
      isIn: {
        args: [[true, false]],
        msg: 'isFeatured must be true or false',
      },
    }
  },
  productImage: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'productImage can not be null',
      },
      notEmpty: {
        msg: 'productImage can not be empty'
      },
    }
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'price can not be null',
      },
      isDecimal: {
        msg: 'price must be in decimal'
      },
    }
  },
  shortDescription: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'shortDescription can not be null',
      },
      notEmpty: {
        msg: 'shortDescription can not be empty'
      },
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'description can not be null',
      },
      notEmpty: {
        msg: 'description can not be empty'
      },
    }
  },
  productUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'productUrl can not be null',
      },
      notEmpty: {
        msg: 'productUrl can not be empty'
      },
      isUrl: {
        msg: 'Invalid productUrl string',
      }
    }
  },
  category: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    validate: {
      notNull: {
        msg: 'category can not be null',
      },
      notEmpty: {
        msg: 'category can not be empty'
      },
    }
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    validate: {
      notNull: {
        msg: 'tags can not be null',
      },
      notEmpty: {
        msg: 'tags can not be empty'
      },
    }
  },
  createdBy: {
    type: Sequelize.INTEGER,
    references: {
      model: 'user',
      key: 'id',
    }
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
},
{
  paranoid: true,
  freezeTableName: true,
  modelName: 'project',
}
);