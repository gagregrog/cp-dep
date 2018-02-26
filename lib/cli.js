'use strict';

const getUsage = require('command-line-usage');
const commandLineArgs = require('command-line-args');

const optionDefinitions = [
  { 
    name: 'copy',
    alias: 'c',
    type: Boolean,
    description: 'Copy the install command to your clipboard.',
  },
  { 
    name: 'install',
    alias: 'i',
    type: Boolean,
    description: 'Install the packages in the current directory.',
  },
  { 
    name: 'suppress',
    alias: 'x',
    type: Boolean,
    description: 'Do not print the packages to the console.',
  },
  { 
    name: 'type',
    alias: 't',
    type: String,
    defaultValue: 'both',
    description: 'Copy [italic]{full} dependencies, [italic]{dev} dependencies, or [italic]{both}.',
  },
  { 
    name: 'path',
    alias: 'p',
    type: String,
    defaultOption: true,
    description: 'The path to the package.json file you want to copy.',
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
    content: 'A command-line tool to view, copy, or install an npm package\'s dependencies.',
  },
  {
    header: 'Options',
    optionList: optionDefinitions,
  },
  {
    header: 'Examples',
    content: [
      {
        desc: '1. See the dependencies in the current folder.',
        example: '$ cp-dep .',
      },
      {
        desc: '2. Copy some packages to the clipboard, but suppress printing.',
        example: '$ cp-dep ../../package.json -cx',
      },
      {
        desc: '3. Install the project\'s dev dependencies in the current folder. ',
        example: '$ cp-dep ~/Desktop/project/ --install --type dev',
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
