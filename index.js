#!/usr/bin/env node

'use strict';

const { options, usage } = require('./lib/cli.js');
const switchboard = require('./lib/switchboard.js');

const {
  help,
  path,
} = options;

if (help) console.log(usage);
else if (!path) console.log('\n  Please provide a valid path to a package.json');
else {
  switchboard(path, options)
    .catch(error => {
      if (error.code === 'ENOENT') console.log(`package.json not found at path ${path}`);
    });
}
