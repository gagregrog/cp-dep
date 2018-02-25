#!/usr/bin/env node

'use strict';

const switchboard = require('./lib/switchboard.js');

switchboard('.', { type: 'both' });
