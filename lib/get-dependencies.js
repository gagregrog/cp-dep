'use strict';

const fs = require('fs-extra');

module.exports = (path) =>
  fs.readJson(path)
    .then(pkg => {
      let prefix = 'npm i ';
      let dependencies = prefix + Object.keys(pkg.dependencies).join(' ');
      let devDependencies = prefix + Object.keys(pkg.devDependencies).join(' ') + ' -D';
      return { dependencies, devDependencies };
    });
