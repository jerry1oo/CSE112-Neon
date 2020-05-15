# CSE112-Neon

## Installing
```bash
npm i
```

## Running 
```bash
npm start
```


## Commands
	npm start - runs the electron app
	npm lint - runs the linter
	npm test:unit - runs all tests in test/unit_testing
	npm prepush - runs both npm lint and npm test:unit



## Testing
 Unit Testing
 
	Check out /test/unit_testing/sum.js for an example of how to make a unit test.
	
	
	Check out /test/unit_testing/spec.js for an example of how to make an integration test.
	
## Building

npm build --> will create a folder named dist in your source dir with the build files



## Release

Releasing

When you want to create a new release, follow these steps:

    1. Update the version in your project's package.json file (e.g. 1.2.3)
    2. Commit that change (git commit -am v1.2.3)
    3. Tag your commit (git tag v1.2.3). Make sure your tag name's format is v*.*.*. Your workflow will use this tag to detect when to create a release
    4. Push your changes to GitHub (git push && git push --tags)

After building successfully, the action will publish your release artifacts. By default, a new release draft will be created on GitHub with download
links for your app. If you want to change this behavior, have a look at the electron-builder docs.