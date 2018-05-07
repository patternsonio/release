'use strict';

const { access: checkAccess, publish } = require('@patternson/cli');
const SemanticReleaseError = require('@semantic-release/error');

module.exports = {
  verifyConditions() {
    return checkAccess({}).then(
      (access) => {
        if (!access.publish) {
          return Promise.reject(
            new SemanticReleaseError(
              'No publish access to library',
              'EPNOACCESS',
            ),
          );
        }

        return Promise.resolve();
      },
      (err) => {
        return Promise.reject(
          new SemanticReleaseError(err.message, 'EPFAILACCESSCHECK'),
        );
      },
    );
  },
  publish(
    pluginConfig,
    {
      nextRelease: { version },
    },
  ) {
    return publish({ options: { version } }).then(
      (result) => {
        console.log(result);
      },
      (err) => {
        return Promise.reject(
          new SemanticReleaseError(err.message, 'EPFAILPUBLISH'),
        );
      },
    );
  },
};
