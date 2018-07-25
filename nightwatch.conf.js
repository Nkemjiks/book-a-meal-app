require('babel-core/register');

const fs = require('fs');
module.exports = ((settings) => {
  const seleniumServerFileName =
    fs.readdirSync('bin/selenium-server-standalone-3.9.1.jar');
  settings.selenium.server_path += seleniumServerFileName;
  return settings;
})(require('./nightwatch.json'));
