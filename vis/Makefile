js/main.js: src/*.js
	mkdir -p js
	rm -rf js/main.js
	jshint src/*.js
	browserify src/*.js -o js/main.js
	chmod -w js/main.js

clean:
	rm -rf js