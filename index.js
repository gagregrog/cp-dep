#!/usr/bin/env node

'use strict';

const copy = require('clipboardy');
const getDependencies = require('./lib/get-dependencies.js');

let path = process.argv[2];

const log = input => {
  if (input) console.log(input);
};

if (!path) throw new Error('Please provide a path');

if (!(/.*package.json$/).test(path)) {
  if (!path.endsWith('/')) path += '/';
  path += 'package.json';
}

getDependencies(path)
  .then(obj => {
    copy.write(obj.devDependencies + '; ' + obj.dependencies);
    log(obj.dependencies);
    log(obj.devDependencies);
  })
  .catch(error => {
    if (error.code === 'ENOENT') console.log(`package.json not found at path ${path}`);
    else console.log(error);
  });
