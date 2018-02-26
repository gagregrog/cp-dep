'use strict';

require('jest');
const clipboard = require('clipboardy');
require('jest-plugin-console-matchers/setup');

const switchboard = require('../lib/switchboard.js');

const assets = `${__dirname}/assets`;

describe('./lib/switchboard.js', () => {
  it('should throw an error if not called with a path', () => {
    expect(switchboard).toThrow('Please provide a path');
  });

  it('should throw if called with an invalid path', () => {
    const path = './packageSpot/package.json';
    return switchboard(path, { type: 'both' })
      .then(Promise.reject)
      .catch(error => {
        expect(error.code).toEqual('ENOENT');
      });
  });

  it('should copy all install commands to the clipboard', () => {
    const path = `${assets}/both`;
    clipboard.writeSync('');
    return switchboard(path, { type: 'both', copy: true })
      .then(() => {
        expect(clipboard.readSync())
          .toEqual('npm i dep1 dep2; npm i devDep1 devDep2 devDep3 -D');
      });
  });

  it('should copy only dev dependency install commands to the clipboard', () => {
    const path = `${assets}/dev/`;
    clipboard.writeSync('');
    return switchboard(path, { type: 'dev', copy: true, suppress: true })
      .then(() => {
        expect(clipboard.readSync())
          .toEqual('npm i devDep1 devDep2 devDep3 -D');
      });
  });
  
  it('should not copy dependencies if options.copy is false', () => {
    const path = `${assets}/dev/`;
    clipboard.writeSync('');
    return switchboard(path, { type: 'dev', copy: false, suppress: true })
      .then(() => {
        expect(clipboard.readSync())
          .toEqual('');
      });
  });
});
