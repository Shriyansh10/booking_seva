import * as models from "./user.model.js";
import ApiError from "../../common/utils/api-error.js";
import * as utils from "../../common/utils/jwt.utils.js";
import pool from "../../common/config/db.js";

const register = async ({ name, email, password }) => {
  const hashedPassword = await utils.bcryptHash(password);
  const user = await models.getUserByEmail(pool, {email});
  if (!user) throw ApiError.unauthorized("User already created");

  const userObj = await models.createUser(pool, { name, email, hashedPassword });
  if (!userObj) throw ApiError.forbidden("User not created");
  return userObj;
};

const login = async ({ email, password }) => {
  const user = await models.getUserWithPasswordByEmail(pool, { email });
  if (!user) throw ApiError.notfound();

  const isMatched = await utils.bcryptCompare(password, user.password);
  if (!isMatched) throw ApiError.forbidden("Wrong Credentials");

  const accessToken = utils.generateAccessToken({
    id: user.id,
    email: user.email,
  });
  const refreshToken = utils.generateRefreshToken({ id: user.id });

  const hashedRefreshToken = await utils.bcryptHash(refreshToken);
  const userObj = await models.updateRefreshToken(pool, {
    email,
    hashedRefreshToken,
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  });
  if (!userObj) throw ApiError.expectationFailed("RefreshToken not updated");

  return {user: userObj, accessToken, refreshToken};
};

const profile = async (user) => {
  const userObj = await models.getUserById(pool, user)
  if(!userObj) throw ApiError.notfound('User not found');
  return userObj;
}


export { register, login, profile};
