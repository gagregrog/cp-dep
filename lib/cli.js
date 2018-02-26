'use strict';

const getUsage = require('command-line-usage');
const commandLineArgs = require('command-line-args');

const optionDefinitions = [
  { 
    name: 'path',
    alias: 'p',
    type: String,
    defaultOption: true,
    description: 'Required: The path to the package.json file you want to copy.',
  },
  { 
    name: 'type',
    alias: 't',
    type: String,
    defaultValue: 'both',
    description: 'Copy [italics]{full} dependencies, [italics]{dev} dependencies, or [italics]{both}. Default is [italics]{both}.',
  },
  { 
    name: 'copy',
    alias: 'c',
    type: Boolean,
    description: 'Copy the npm install command to your clipboard.',
  },
  { 
    name: 'suppress',
    alias: 'x',
    type: Boolean,
    description: 'Do not print the packages to the console.',
  },
  { 
    name: 'help',
    alias: 'h',
    type: Boolean,
    description: 'View this help file.',
  },
];

const sections = [
  {
    header: 'cp-dep',
    content: 'A command-line tool to view or copy an npm package\'s dependencies.',
  },
  {
    header: 'Options',
    optionList: optionDefinitions,
  },
  {
    header: 'Examples',
    content: [
      {
        desc: '1. See all dependencies in the current folder.',
        example: '$ cp-dep .',
      },
      {
        desc: '2. Copy all packages from the directory to the clipboard.',
        example: '$ cp-dep ../../package.json -c',
      },
      {
        desc: '3. Copy only dev packages to the clipboard, but suppress printing.',
        example: '$ cp-dep ../ -x --type dev',
      },
    ],
  },
  {
    content: 'Project home: [underline]{https://github.com/RobertMcReed/cp-dep/}',
  },
];

const usage = getUsage(sections);
const options = commandLineArgs(optionDefinitions);

module.exports = {
  usage,
  options,
};
