import swagger from './swagger.json';

import signup from './auth/signup.json';
import login from './auth/login.json';
import post from './post/createPost.json';
import comment from './post/addComment.json';
import deletePost from './post/deletePost.json';
import like from './post/likePost.json';

swagger.paths['/auth/signup'] = signup;
swagger.paths['/auth/login'] = login;
swagger.paths['/post'] = post;
swagger.paths['/post/{id}/comment'] = comment;
swagger.paths['/post/{id}/like'] = like;
swagger.paths['/post/{id}'] = deletePost;

export default swagger;
