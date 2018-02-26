#!/usr/bin/env node

'use strict';

const commandLineArgs = require('command-line-args');
const switchboard = require('./lib/switchboard.js');

const path = '.';
const optionDefinitions = [
  { 
    name: 'copy',
    alias: 'c',
    type: Boolean,
    defaultValue: false,
  },
  { 
    name: 'install',
    alias: 'i',
    type: Boolean,
    defaultValue: false,
  },
  { 
    name: 'supress',
    alias: 'x',
    type: Boolean,
    defaultValue: false,
  },
  { 
    name: 'type',
    alias: 't',
    type: String,
    defaultValue: 'both',
  },
];

const options = commandLineArgs(optionDefinitions);

console.log(options);

switchboard(path, { type: 'both', copy: true, suppress: false })
  .catch(error => {
    if (error.code === 'ENOENT') console.log(`package.json not found at path ${path}`);
  });
