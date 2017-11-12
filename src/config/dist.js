'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'dist',
  serverURL: 'http://bsc-forms-External-PIBJ6X6AAFUI-331404554.eu-central-1.elb.amazonaws.com:8080/'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
