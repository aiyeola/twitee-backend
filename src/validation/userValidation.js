import Joi from 'joi';

import Schema from './schema';
import validator from 'utils/validator';

/** Validates User Input  */
export default class userValidator {
  /**
   * Schema to validate sign up fields
   * @param {object} req - request object.
   * @param {object} res - response object.
   * @param {object} next - next middleware
   * @returns {object} validation schema
   */
  static async validateSignup(req, res, next) {
    const schema = Joi.object().keys({
      email: Schema.email,
      password: Schema.password,
    });
    validator(schema, req.body, res, next);
  }

  /**
   * Schema to validate login fields
   * @param {object} req - request object.
   * @param {object} res - response object.
   * @param {object} next - next middleware
   * @returns {object} validation schema
   */
  static async validateLogin(req, res, next) {
    const schema = Joi.object().keys({
      email: Joi.string().required().error(new Error('email is required')),
      password: Joi.string()
        .required()
        .error(new Error('password is required')),
    });
    validator(schema, req.body, res, next);
  }
}
