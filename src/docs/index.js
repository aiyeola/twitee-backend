import swagger from './swagger.json';

import signup from './auth/signup.json';
import login from './auth/login.json';

swagger.paths['/auth/signup'] = signup;
swagger.paths['/auth/login'] = login;

export default swagger;
