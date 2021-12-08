import Response from 'utils/response';
import postService from 'services/postService';

class Access {
  static async isAllowedUser(req, res, next) {
    const { userRoles } = req.user;
    const allowedUsers = ['Travel Administrator', 'Accommodation Supplier'];
    if (allowedUsers.includes(userRoles) === false) {
      return Response.authorizationError(
        res,
        'You are not allowed to perform this task',
      );
    }
    next();
  }

  static async isRequester(req, res, next) {
    if (req.user.userRoles !== 'Requester') {
      return Response.authorizationError(
        res,
        "You don't have access rights to complete this operation",
      );
    }
    next();
  }

  static async isOwner(req, res, next) {
    const { id } = req.params;

    if (isNaN(id)) {
      return Response.badRequestError(res, 'Enter a valid id');
    }
    const data = await postService.findPost({ id });
    if (data === null) {
      return Response.notFoundError(res, 'Enter a valid id');
    }
    const { userId } = data.dataValues;
    if (userId !== req.user.id) {
      return Response.authorizationError(
        res,
        "You don't have rights to perform this action",
      );
    }

    next();
  }
}

export default Access;
