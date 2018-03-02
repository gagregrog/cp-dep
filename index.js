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
      const messagePart = options.path === '.' ?
        'in current directory.' :
        `at path ${options.path}`;
      if (error.code === 'ENOENT') 
        console.log(`\n  No package.json found ${messagePart}\n\n  Run "cp-dep --help" for help.`);
    });
}
