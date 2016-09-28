# creativepatterns

This is creativestyle's pattern library that will contain all of the awesome code written by our great developers.


## Local installation

To install the local copy of the library:

1. Make sure you have `node >=4.0.0` installed on your computer, you can run `node -v` in console to check it.
2. Clone the repository.
3. Run `npm install` in project's root to install all of the needed dependencies.
4. Run `npm run serve` to build the library and start its website.

## Essential commands

Since pattern library's build system is based on gulp, here are some most essential commands which are helpful when working with it.

- `npm run build` or `gulp build` - Builds entire pattern library.
- `npm run serve` or `gulp serve` - Builds entire pattern library and fires up local dev server which let's you browse the files.
- `npm run test` or `gulp test` - Build scripts and runs unit tests.
  - Use `-w` or `--watch` flag to rerun tests each time files change.
  - Use `-p package_path` or `--package package_path` to run tests for single package where `package_path` is a path relative to `packages` directory.
- `npm run lint` or `gulp lint` - Lints scripts and styles according to our code style rules.

## Adding new components

1. Clone it!
2. Run `npm install` in project's root to install all of the needed dependencies.
3. Run `npm run generator` to fire up component generator.
4. Follow generator instructions.
5. Write your code in newly generated directory.
6. Add documentation and tests.
7. Follow Contributing guide since point 2.

## Contributing

1. Clone it!
2. Create your feature branch: `git checkout -b feature-my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a merge request :D
