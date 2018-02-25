'use strict';

const copy = require('clipboardy');
const deps = require('./deps.js');

// type should be 'both', 'dep', or 'dev'
module.exports = (path, options) => {
  if (!path) throw new Error('Please provide a path');
  
  // ensure path leads to a potential package.json
  if (!(/.*package.json$/).test(path)) {
    if (!path.endsWith('/')) path += '/';
    path += 'package.json';
  }

  const { type } = options;
  
  deps.get(path, options.type)
    .then(pkgDeps => {
      // print packages unless suppressed
      if (!options.suppress) {
        // print the packages
        deps.print(pkgDeps, type);
      }

      // install packages in current directory
      if (options.install) {
        // install in current directory with child_process exec
      }

      // copy packages to clipboard
      if (options.copy) {
        // copy deps to clipboard
        let install = '';

        if (options.both) {
          // copy.write();
        }
      }
    })
    .catch(error => {
      if (error.code === 'ENOENT') console.log(`package.json not found at path ${path}`);
      else console.log(error);
    });
};

// OPTIONS
// 1. Print - default
// 2. Suppress - don't print
// 3. run - install in current path
// 4. copy - duh
//    a. both
//    b. regular only
//    c. dev only
