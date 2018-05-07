'use strict';

module.exports = {
  verifyConditions: ['@patternson/release', '@semantic-release/github'],
  prepare: [],
  publish: ['@patternson/release', '@semantic-release/github'],
};
