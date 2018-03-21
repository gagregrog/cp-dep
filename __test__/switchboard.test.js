'use strict';

require('jest');
const ncp = require('copy-paste');

const switchboard = require('../lib/switchboard.js');

const assets = `${__dirname}/assets`;

// hijack to remove console logs from tests
global.console = {
  log: jest.fn(),
};

describe('./lib/switchboard.js', () => {
  // reset clipboard before each test
  beforeEach((done) => {
    ncp.copy('', done);
  });

  it('should throw if called with an invalid path', () => {
    const path = './packageSpot/package.json';
    return switchboard(path, {})
      .then(Promise.reject)
      .catch(error => {
        expect(error.code).toEqual('ENOENT');
      });
  });
  
  it('should add /package.json to the path if the path ends in a directory', () => {
    const path = `${assets}`;
    expect(() =>
      switchboard(path, { full: true })
    ).not.toThrow();
  });

  it('should copy to the clipboard given the copy option', (done) => {
    const path = `${assets}/`;
    const test = () => {
      let result = ncp.paste();
      expect(result).toEqual('npm i devDep1@4.18.1 devDep2@12.1.0 devDep3@2.9.0 -D');
      done();
    };
    return switchboard(path, { dev: true, copy: true, suppress: true }, test);
  });
});
