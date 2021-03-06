'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'test',
  serverURL: 'http://localhost:8080/'
};

export default Object.freeze(Object.assign(baseConfig, config));
