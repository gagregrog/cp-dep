'use strict';

const ncp = require('copy-paste');

const deps = require('./deps.js');

// callback used for testing only
module.exports = (path, options, callback) => {
  // ensure path leads to a potential package.json
  if (!(/.*package.json$/).test(path)) {
    if (!path.endsWith('/')) path += '/';
    path += 'package.json';
  }

  const { 
    type,
    suppress,
    copy,
  } = options;
  
  return deps.get(path, type)
    .then(pkgDeps => {
      // print packages unless suppressed
      if (!options.suppress) deps.print(pkgDeps, type);

      // copy packages to clipboard
      if (options.copy) {
        const commands = deps.prepCopy(pkgDeps, type);
        // clipboard.writeSync(commands);
        ncp.copy(commands, callback);
      }
    });
};
