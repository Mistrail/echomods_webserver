import { DataTypes, Model } from 'sequelize';
import sequelize from './index.js';
import User from './User.js';

export default class Personal extends Model {}

Personal.init({
  username: {
    type: DataTypes.STRING,
    unique: true,
  },
}, {
  sequelize,
  paranoid: false,
  timestamps: false,
});

User.hasOne(Personal);
Personal.belongsTo(User);
