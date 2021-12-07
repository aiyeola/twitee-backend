import 'dotenv/config';

import Application from './application';

(async () => {
  const application = new Application();
  await application.init();
})();

export default Application;
