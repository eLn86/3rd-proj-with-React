
// #!/usr/bin/env node
/* eslint strict: 0 */

'use strict';

/**
 * Module dependencies.
 */

// enables ES6 ('import'.. etc) in Node
require('babel-core/register');
require('babel-polyfill');

const app = require('../app').default;
