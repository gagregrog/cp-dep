#!/usr/bin/env node

'use strict';

const { options, usage } = require('./lib/cli.js');
const switchboard = require('./lib/switchboard.js');

const {
  help,
  path,
  copy,
} = options;

if (help || (!copy && !path)) console.log(usage);
else if (!path) console.log('\n  Please provide a valid path to a package.json');
else {
  switchboard(path, options)
    .catch(error => {
      if (error.code === 'ENOENT') console.log(`package.json not found at path ${path}`);
    });
}
