import { DataTypes, Model } from 'sequelize';
import User from './User.js';
import sequelize from './index.js';

export default class Role extends Model {}

Role.init({
  role: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  timestamps: false,
  paranoid: false,
  indexes: [
    { type: 'UNIQUE', fields: ['UserId', 'role'] },
  ],
});

Role.User = () => Role.belongsTo(User);
