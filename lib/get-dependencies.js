'use strict';

const fs = require('fs-extra');

module.exports = (path) =>
  fs.readJson(path)
    .then(pkg => {
      const prefix = 'npm i ';
      const dependencies = pkg.dependencies ? 
        prefix + Object.keys(pkg.dependencies).join(' ') : null;

      const devDependencies = pkg.devDependencies ?
        prefix + Object.keys(pkg.devDependencies).join(' ') + ' -D' : null;
        
      return { dependencies, devDependencies };
    });
