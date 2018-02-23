'use strict';

const copy = require('clipboardy');
const getDependencies = require('./lib/get-dependencies.js');

getDependencies('./package.json')
  .then(obj => {
    copy.write(obj.devDependencies + '; ' + obj.dependencies);
  });

