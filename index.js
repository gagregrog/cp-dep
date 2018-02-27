#!/usr/bin/env node

'use strict';

const switchboard = require('./lib/switchboard.js');
const { options, usage, parseError } = require('./lib/cli.js');

if (parseError) console.log(`\n  ${parseError.name}: "${parseError.value}"\n\n  Please try again.`);
else if (options.help) console.log(usage);
else {
  if (!options.path) options.path = '.';
  switchboard(options.path, options)
    .catch(error => {
      if (error.code === 'ENOENT') console.log(`package.json not found at path ${options.path}`);
    });
}
