'use strict';

require('jest');
const ncp = require('copy-paste');

const switchboard = require('../lib/switchboard.js');

const assets = `${__dirname}/assets`;

describe('./lib/switchboard.js', () => {
  // reset clipboard before each test
  beforeEach((done) => {
    ncp.copy('', done);
  });

  it('should throw if called with an invalid path', () => {
    const path = './packageSpot/package.json';
    return switchboard(path, { type: 'both', suppress: true })
      .then(Promise.reject)
      .catch(error => {
        expect(error.code).toEqual('ENOENT');
      });
  });
  
  it('should add /package.json to the path if the path ends in a directory', () => {
    const path = `${assets}/both`;
    expect(() =>
      switchboard(path, { type: 'both', suppress: true })
    ).not.toThrow();
  });

  it('should copy to the clipboard given the copy option', (done) => {
    const path = `${assets}/dev/package.json`;
    const test = () => {
      let result = ncp.paste();
      expect(result).toEqual('npm i devDep1 devDep2 devDep3 -D');
      done();
    };
    return switchboard(path, { type: 'dev', copy: true, suppress: true }, test);
  });
});
