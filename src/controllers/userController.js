import UserService from 'services/userService';
import Response from 'utils/response';
import Password from 'utils/generatePassword';
import SessionManager from 'utils/sessionManager';
import Email from 'utils/mails/email';
import OnboardEmail from 'utils/mails/onboard.email.js';
import { FRONTEND_URL } from 'config';

export default class User {
  static createUser = async (req, res, next) => {
    const rawData = req.body;
    try {
      const userExists = await UserService.findUser({
        email: rawData.email,
      });

      if (userExists) {
        return Response.conflictError(res, 'Email has been used to register');
      }
      const obj = new Password(rawData);
      const newPassword = await obj.encryptPassword();

      rawData.name = rawData.email.split('@')[0];
      rawData.password = newPassword;

      const data = await UserService.createUser(rawData);

      const token = SessionManager.generateToken({
        id: data.id,
        email: data.email,
      });
      data.dataValues.userToken = token;
      delete data.dataValues.password;
      delete data.dataValues.updatedAt;

      const link = `${FRONTEND_URL}`;
      let onboard;
      try {
        const headers = Email.header({
          to: data.dataValues.email,
          subject: 'Twitee Onboarding',
        });
        const msg = OnboardEmail.onBoardNewUser(link, data.dataValues);
        await Email.sendMail(res, headers, msg);
        onboard = 'onboard mail sent';
      } catch (error) {
        onboard = 'onboard mail not sent';
      }

      return Response.customResponse(
        res,
        201,
        'New user has been created successfully',
        { ...data.dataValues, onBoardNewUser: { message: onboard } },
      );
    } catch (error) {
      return next(error);
    }
  };

  static login = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const userExists = await UserService.findUser({ email });

      if (!userExists) {
        return Response.authenticationError(
          res,
          'Invalid email or password entered',
        );
      }

      const user = userExists.dataValues;

      const match = await Password.checkPasswordMatch(password, user.password);
      if (!match) {
        return Response.authenticationError(res, 'Invalid email or password');
      }
      user.userToken = await SessionManager.createSession(user, res);
      delete user.password;
      delete user.createdAt;

      return Response.customResponse(
        res,
        200,
        'User signed in successfully',
        user,
      );
    } catch (error) {
      return next(error);
    }
  };

  static logout = (req, res) => {
    SessionManager.destroyToken(req.user);

    return Response.customResponse(res, 200, 'user logged out successfully');
  };
}
