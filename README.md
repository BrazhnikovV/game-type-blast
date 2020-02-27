# Игра типа "BLAST" (typescript, pixijs) #

A generic frontend **Pixi.js** project boiler plate in **TypeScript** with **source map** support.

## Install ##
	$> npm run install

## Build ##

Project settings are defined in `package.json`, `settings` section. Inside this section, set `debug` to `true` to debug the project with source maps, or set `debug` to `false` to build the project in the release mode.

Tasks are defined in the `gulpfile.js` script.

Commands should be run under a **bash** shell.

The following command builds the project, runs unit tests, and opens the browser. If any change happens, it builds the project again and refreshes the browser.

	$> npm run watchRefresh

For more predefined commands, see `package.json`, item `scripts`.

Unit tests are logged in the `tests/` folder, file `tape.log`.

## Build PROD ##
Set the debug property to false:

	"settings": {
	    "debug": false,
	    "tsconfig": {
	      "debug": "tsconfig.debug.json",
	      "release": "tsconfig.json"
	    },
	  }

	$> npm run compile

## Contributors ##

yahiko


## Licence ##

MIT
