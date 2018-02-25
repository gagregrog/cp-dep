'use strict';

const copy = require('clipboardy');
const getDependencies = require('./lib/get-dependencies.js');
let path = process.argv[2];

if (!path) throw new Error('Please provide a path');

if (!(/.*package.json$/).test(path)) {
  if (!path.endsWith('/')) path += '/';
  path += 'package.json';
}

console.log(path);

getDependencies('./package.json')
  .then(obj => {
    copy.write(obj.devDependencies + '; ' + obj.dependencies);
  });
