const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        main: path.resolve('./src', 'day.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'Day.js',
        library: {
            name: 'Dayjs',
            type: 'var',
        },
    },
};