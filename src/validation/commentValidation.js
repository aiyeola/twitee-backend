import Joi from 'joi';

import Schema from './schema';
import validator from 'utils/validator';

export default class CommentValidation {
  static async validateComment(req, res, next) {
    const schema = Joi.object().keys({
      comment: Schema.comment,
    });
    validator(schema, req.body, res, next);
  }

  static async validateId(req, res, next) {
    const schema = Joi.object()
      .keys({
        id: Schema.id,
      })
      .options({ allowUnknown: false });
    validator(schema, req.params, res, next);
  }
}
