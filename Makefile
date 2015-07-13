.PHONY: node_modules build_sass



dev: node_modules build_sass run-dev

# install node modules from npm-shrinkwrap.json
node_modules:
	npm install
	npm prune

build_sass: 
	grunt sass

run-dev:
	export NODE_ENV=development; node app.js

run:
	node app.js
