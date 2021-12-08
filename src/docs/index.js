import swagger from './swagger.json';

import signup from './auth/signup.json';
import login from './auth/login.json';
import post from './post/createPost.json';

swagger.paths['/auth/signup'] = signup;
swagger.paths['/auth/login'] = login;
swagger.paths['/post'] = post;

export default swagger;
