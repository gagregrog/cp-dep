'use strict';

require('jest');

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
});
