'use strict';

require('jest');
require('jest-plugin-console-matchers/setup');

const deps = require('../lib/deps.js');

const assets = `${__dirname}/assets`;
const packageDeps = {
  dependencies: 'dep1 dep2',
  devDependencies: 'dep1 dep2 dep3',
};

describe('lib/deps.js ', () => {
  describe('#get', () => {
    describe('Asset: both', () => {
      it('should get both deps', () => {
        return deps.get(`${assets}/both/package.json`)
          .then(pkgDeps => {
            expect(pkgDeps.dependencies).toEqual('dep1 dep2');
            expect(pkgDeps.devDependencies).toEqual('devDep1 devDep2 devDep3');
          });
      });
      it('should only get full deps', () => {
        return deps.get(`${assets}/both/package.json`, 'full')
          .then(pkgDeps => {
            expect(pkgDeps.dependencies).toEqual('dep1 dep2');
            expect(pkgDeps.devDependencies).toBeNull();
          });
      });
      it('should only get dev deps', () => {
        return deps.get(`${assets}/both/package.json`, 'dev')
          .then(pkgDeps => {
            expect(pkgDeps.dependencies).toBeNull();
            expect(pkgDeps.devDependencies).toEqual('devDep1 devDep2 devDep3');
          });
      });
    });

    describe('Asset: full', () => {
      it('should try to get both deps but only get full', () => {
        return deps.get(`${assets}/full/package.json`)
          .then(pkgDeps => {
            expect(pkgDeps.dependencies).toEqual('dep1 dep2');
            expect(pkgDeps.devDependencies).toBeNull();
          });
      });
      it('should only get full deps', () => {
        return deps.get(`${assets}/full/package.json`, 'full')
          .then(pkgDeps => {
            expect(pkgDeps.dependencies).toEqual('dep1 dep2');
            expect(pkgDeps.devDependencies).toBeNull();
          });
      });
      it('should not be able to get dev deps', () => {
        return deps.get(`${assets}/full/package.json`, 'dev')
          .then(pkgDeps => {
            expect(pkgDeps.dependencies).toBeNull();
            expect(pkgDeps.devDependencies).toBeNull();
          });
      });
    });

    describe('Asset: dev', () => {
      it('should try to get both deps but only get dev', () => {
        return deps.get(`${assets}/dev/package.json`)
          .then(pkgDeps => {
            expect(pkgDeps.dependencies).toBeNull();
            expect(pkgDeps.devDependencies).toEqual('devDep1 devDep2 devDep3');
          });
      });
      it('should not be able to get full deps', () => {
        return deps.get(`${assets}/dev/package.json`, 'full')
          .then(pkgDeps => {
            expect(pkgDeps.dependencies).toBeNull();
            expect(pkgDeps.devDependencies).toBeNull();
          });
      });
      it('should only get dev deps', () => {
        return deps.get(`${assets}/dev/package.json`, 'dev')
          .then(pkgDeps => {
            expect(pkgDeps.dependencies).toBeNull();
            expect(pkgDeps.devDependencies).toEqual('devDep1 devDep2 devDep3');
          });
      });
    });

    describe('Asset: none', () => {
      it('should try to get both deps but get none', () => {
        return deps.get(`${assets}/none/package.json`)
          .then(pkgDeps => {
            expect(pkgDeps.dependencies).toBeNull();
            expect(pkgDeps.devDependencies).toBeNull();
          });
      });
      it('should not be able to get full deps', () => {
        return deps.get(`${assets}/none/package.json`, 'full')
          .then(pkgDeps => {
            expect(pkgDeps.dependencies).toBeNull();
            expect(pkgDeps.devDependencies).toBeNull();
          });
      });
      it('should not be able to get dev deps', () => {
        return deps.get(`${assets}/none/package.json`, 'dev')
          .then(pkgDeps => {
            expect(pkgDeps.dependencies).toBeNull();
            expect(pkgDeps.devDependencies).toBeNull();
          });
      });
    });
  });

  describe('#print', () => {
    it('should log the deps', () => {
      expect(() => {
        deps.print(packageDeps, 'both');
      }).toConsoleLog();
    });
  });
});
