# cp-dep 

[![Build Status](https://travis-ci.org/RobertMcReed/cp-dep.svg?branch=master)](https://travis-ci.org/RobertMcReed/cp-dep)
[![Coverage Status](https://coveralls.io/repos/github/RobertMcReed/cp-dep/badge.svg?branch=master)](https://coveralls.io/github/RobertMcReed/cp-dep?branch=master)

A command-line tool to view or copy an npm package's dependencies.

```bash
$ cp-dep <path-to-old-project> [options]
```

## Installation

Install globally with npm.

```bash
$ npm i -g cp-dep
```

## Features

  * Print dependencies to the console
  * Copy dependencies to the clipboard as an npm install command
      * All dependencies
      * Full dependencies only
      * Dev dependencies only

## How to use

Use the keyword `cp-dep` and provide a path to a `package.json` file.
## Options

  * `-p`, `--path`: The path of the package.json you want to copy. Path defaults to the current directory if none is provided.
  * `-f`, `--full`: View/Copy only full dependencies.
  * `-d`, `--dev`: View/Copy only dev dependencies.
  * `-c`, `--copy`: Copy the npm install command to the clipboard.
  * `-x`, `--suppress`: Do not print the packages to the console.
  * `-h`, `--help`: Show the help file.
  * `-u`, `--upgrade`: Use current release for packages

## Examples

1. Copy all dependencies of a project from the current directory.
    ```bash
    $ cp-dep -c
    ```

1. View the dev dependencies of a project on your desktop.
    ```bash
    $ cp-dep ~/Desktop/myProject/package.json --dev
    ```
    
1. Copy only the full dependencies from a project in your Documents folder, but don't print the results.
    ```bash
    $ cp-dep ~/Documents/myOtherProject/ -cfx
    ```
    
1. Copy all dependencies from the project in your current folder and upgrade to the newest versions.
    ```bash
    $ cp-dep -cu
    ```

## Tests

  To run the test suite, clone the repo, install the dependencies, then run `npm test`:

```bash
$ git clone https://github.com/RobertMcReed/cp-dep.git
$ npm i
$ npm test
```

## Future Release Features

1. Install dependencies for a project at a given directory.
2. Flag to selectively choose which packages to include in the copy command.

## Change Log

- 1.0.0
    - Initial release

- 1.0.1
    - Readme command typos fixed

- 2.0.1
    - Directory now defaults to the current directory
    - --type flag replaced with --dev and --full
    - [clipboardy](https://www.npmjs.com/package/clipboardy) dependency replaced with [copy-paste](https://www.npmjs.com/package/copy-paste)

- 3.0.0
    - Install script now maintains the versioning of the copied dependencies
    - Use the -u flag to upgrade all packages to the newest versions

- 3.0.1
    - Fixed ^ slice issue with versioning

## License

[MIT](LICENSE)

## Contact

[Email](robert.mc.reed@gmail.com), [GitHub](https://github.com/RobertMcReed), [LinkedIn](https://www.linkedin.com/in/robertmcreed/)
