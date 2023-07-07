import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { DataTypes, Model } from 'sequelize';
import sequelize from './index.js';
import Personal from './Personal.js';

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

  static async check({ login, password }) {
    const user = await User.findOne({ where: { login } });
    if (user) {
      const challenge = User.generatePasswordHash({ password, salt: user.salt });
      return challenge === user.passwordHash ? user : null;
    }
    return null;
  }
}
User.init({
  login: {
    type: DataTypes.UUID,
    unique: true,
    require: true,
  },
  passwordHash: {
    type: DataTypes.STRING(128),
  },
  salt: {
    type: DataTypes.STRING(128),
  },
  password: {
    type: DataTypes.VIRTUAL,
    get() { return '********'; },
    set(password) {
      const salt = User.generateSalt();
      const passwordHash = User.generatePasswordHash({ password, salt });
      this.setDataValue('salt', salt);
      this.setDataValue('passwordHash', passwordHash);
    },
  },

}, {
  sequelize,
  paranoid: true,
});
User.Personal = () => User.hasOne(Personal);
