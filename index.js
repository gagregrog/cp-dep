#!/usr/bin/env node

'use strict';

const switchboard = require('./lib/switchboard.js');

const path = '.';

switchboard(path, { type: 'both' })
  .catch(error => {
    if (error.code === 'ENOENT') console.log(`package.json not found at path ${path}`);
  });
