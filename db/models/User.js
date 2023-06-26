import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { DataTypes, Model } from 'sequelize';
import sequelize from './index.js';

export default class User extends Model {
  static ALGO = 'sha512';

  static DIGEST_TYPE = 'hex';

  static generateSalt() {
    return crypto.randomBytes(64).toString(User.DIGEST_TYPE);
  }

  static generatePasswordHash({
    password,
    salt,
  }) {
    return crypto.createHash(User.ALGO).update(password + salt).digest(User.DIGEST_TYPE);
  }

  getToken() {
    return jwt.sign({ id: this.id }, process.env.JWT_SCRET, {
      expiresIn: process.env.JWT_TOKEN_EXPIRES,
    });
  }

  static verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SCRET);
  }
}
User.init({
  login: {
    type: DataTypes.UUID,
    unique: true,
    require: true,
  },
}, {
  sequelize,
  paranoid: true,
});
