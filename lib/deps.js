'use strict';

const fs = require('fs-extra');

// ------- HELPERS ------- \\
const wantsFull = (type) => 
  ['both', 'full'].includes(type);

const wantsDev = (type) => 
  ['both', 'dev'].includes(type);

const wrapForInstall = (dependencies, dev = false) => {
  let wrapped = dependencies ? `npm i ${dependencies}` : '';
  if (dev && wrapped) wrapped += ' -D';

  return wrapped;
};

const wrapForLog = (dependencies, dev = false) => {
  let wrapped = `Dependencies: ${dependencies || 'None found'}`;
  if (dev) wrapped = `Dev ${wrapped}`;

  return wrapped;
};

// ------- EXPORTS ------- \\
const deps = module.exports = {};

deps.get = (path, type = 'both') =>
  fs.readJson(path)
    .then(pkg => {
      let dependencies = null;
      let devDependencies = null;

      if (wantsFull(type) && pkg.dependencies)
        dependencies = Object.keys(pkg.dependencies).join(' ');

      if (wantsDev(type) && pkg.devDependencies)
        devDependencies = Object.keys(pkg.devDependencies).join(' ');
        
      return { dependencies, devDependencies };
    });

deps.print = (pkgDeps, type) => {
  const { dependencies, devDependencies } = pkgDeps;
  
  if (wantsFull(type))
    console.log(wrapForLog(dependencies));
  if (wantsDev(type))
    console.log(wrapForLog(devDependencies, true));
};

deps.prepCopy = (pkgDeps, type) => {
  const commands = [];
  const { dependencies, devDependencies } = pkgDeps;

  if (wantsFull(type)) {
    const command = wrapForInstall(dependencies);
    if (command) commands.push(command);
  }

  if (wantsDev(type)) {
    const command = wrapForInstall(devDependencies, true);
    if (command) commands.push(command);
  }
  
  return commands.join('; ');
};
