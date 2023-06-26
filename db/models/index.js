import {
  Sequelize, Transaction,
} from 'sequelize';
import configs from '../database.js';

const env = process.env.NODE_ENV || 'development';
const options = configs[env];

const sequelize = new Sequelize({
  ...options,
  dialect: 'mysql',
  transactionType: Transaction.TYPES.EXCLUSIVE,
  logging: console.log,

  pool: {
    min: 0,
    max: 5,
    idle: 600,
    acquire: 30,
    evict: 60,
  },
});

sequelize.authenticate().catch((e) => { throw e; }).then(() => { console.log('MySQL connection established'); });

export default sequelize;
