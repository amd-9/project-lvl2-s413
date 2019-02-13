install:
	npm install

start:
	npx babel-node -- src/bin/gendiff.js

build:
	rm -rf dist
	npm run build

test:
	npm test

watch:
	npm run watch

publish:
	npm publish

lint:
	npx eslint .