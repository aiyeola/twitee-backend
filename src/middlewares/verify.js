import SessionManager from 'utils/sessionManager';
import Response from 'utils/response';

const verify = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    const payload = await SessionManager.decodeToken({ token });
    const result = SessionManager.checkToken(payload.userEmail);

    if (result === 'null') {
      return Response.authenticationError(res, 'User not logged in');
    }

    req.user = payload;
    next();
  } catch (error) {
    return Response.authenticationError(res, 'Invalid or expired token');
  }
};

export default verify;
