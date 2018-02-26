# cp-dep 

[![Build Status](https://travis-ci.org/RobertMcReed/cp-dep.svg?branch=master)](https://travis-ci.org/RobertMcReed/cp-dep)

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
  * Copy dependencies to the clipboard
      * All dependencies
      * full dependencies only
      * Dev dependencies only

## How to use

Use the keyword `cp-dep` and provide a path to a `package.json` file.
## Options

  * `-p`, `--path`: The path of the package.json you want to copy.
  * `-t`, `--type`: The type of dependencies you want to copy. Options are `both`, `full`, and `dev`. Default is `both`.
  * `-c`, `--copy`: Copy the npm install command to the clipboard.
  * `-x`, `--suppress`: Do not print the packages to the console.
  * `-h`, `--help`: Show the help file.

## Examples

1. Copy all dependencies of a project from the current directory.
    ```bash
    $ cp-dep . -c
    ```

1. View the dev dependencies of a project on your desktop.
    ```bash
    $ cp-dep ~/Desktop/myProject/package.json -t dev
    ```
    
1. Copy only the full dependencies from a project in your Documents folder, but don't print the results.
    ```bash
    $ cp-dep ~/Documents/myOtherProject/ -cx --type dev
    ```

## Tests

  To run the test suite, first install the dependencies, then run `npm test`:

```bash
$ npm i
$ npm test
```

## Future Release Features

1. Install dependencies for a project at a given directory.
2. Trigger --type declaration with -f --full or -d --dev.

## License

  [MIT](LICENSE)

## Contact

[Email](robert.mc.reed@gmail.com), [GitHub](https://github.com/RobertMcReed), [LinkedIn](https://www.linkedin.com/in/robertmcreed/)