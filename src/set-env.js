
const fs = require('fs');
const dotenv = require('dotenv');

const env = dotenv.config().parsed;

const fileContent = `
(function (window) {
  window.__env = window.__env || {};
  window.__env.G_APP_EN_DOMAIN = '${env.G_APP_EN_DOMAIN}';
  window.__env.NG_APP_DE_DOMAIN = '${env.NG_APP_DE_DOMAIN}';
}(this));
`;

fs.writeFile('./src/assets/env.js', fileContent, function (err) {
  if (err) {
    return console.log(err);
  }
  console.log('The environment variables have been set!');
});
