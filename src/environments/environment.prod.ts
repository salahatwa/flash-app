declare const require: any;
const { name, description, version } = require('../../package.json');

export const environment = {
  production: true,
  api: 'http://mbootx.herokuapp.com/genhub/api/v1',
  name,
  description,
  version,
};
