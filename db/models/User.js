import crypto from 'crypto';

export default (sequelize, DataTypes, Model) => {
  class User extends Model {
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

  return User;
};
