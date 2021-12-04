// eslint-disable-next-line @typescript-eslint/no-var-requires
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
    plugins: [
        new MomentLocalesPlugin({
            localesToKeep: ['it'],
        }),
    ],
};
