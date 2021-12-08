import Joi from 'joi';

import Schema from './schema';
import validator from 'utils/validator';

export default class postValidation {
  static async validatePost(req, res, next) {
    const schema = Joi.object().keys({
      post: Schema.post,
    });
    validator(schema, req.body, res, next);
  }
}
