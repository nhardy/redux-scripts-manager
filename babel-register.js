/**
 * This file needs to Vanilla JavaScript that can be executed with the current Node LTS as Babel cannot know what
 * transformations it would need to apply before reading this file
 */

const { addPath } = require('app-module-path');

// Tell Babel to compile all JS/TS extensions
require('@babel/register')({
  extensions: ['.js', '.ts'],
});

addPath(__dirname);
