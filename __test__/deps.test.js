'use strict';

require('jest');

// required for testing console.logs
global.console = {
  log: jest.fn(),
};

const deps = require('../lib/deps.js');

const assets = `${__dirname}/assets`;
const packageDeps = {
  both: {
    dependencies: 'both1 both2',
    devDependencies: 'both1 both2 both3',
  },
  full: {
    dependencies: 'full1 full2',
    devDependencies: 'full1 full2 full3',
  },
  dev: {
    dependencies: 'dev1 dev2',
    devDependencies: 'dev1 dev2 dev3',
  },
  none: {
    dependencies: null,
    devDependencies: null,
  },
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
      deps.print(packageDeps.both, 'both');
      expect(global.console.log).toHaveBeenCalledWith('Dependencies: both1 both2');
      expect(global.console.log).toHaveBeenCalledWith('Dev Dependencies: both1 both2 both3');
    });
    it('should log only full deps', () => {
      deps.print(packageDeps.full, 'full');
      expect(global.console.log).toHaveBeenCalledWith('Dependencies: full1 full2');
      expect(global.console.log).not.toHaveBeenCalledWith('Dev Dependencies: full1 full2 full3');
    });
    it('should log only dev deps', () => {
      deps.print(packageDeps.dev, 'dev');
      expect(global.console.log).not.toHaveBeenCalledWith('Dependencies: dev1 dev2');
      expect(global.console.log).toHaveBeenCalledWith('Dev Dependencies: dev1 dev2 dev3');
    });
    it('should log no deps', () => {
      deps.print(packageDeps.none, 'both');
      expect(global.console.log).toHaveBeenCalledWith('Dependencies: None found');
      expect(global.console.log).toHaveBeenCalledWith('Dev Dependencies: None found');
    });
  });
});
