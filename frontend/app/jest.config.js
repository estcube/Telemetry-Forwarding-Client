const { defaults } = require('jest-config');
const { jsWithTs: tsjPreset } = require('ts-jest/presets');

module.exports = {
    verbose: false,

    transform: {
        ...tsjPreset.transform,
    },

    testRegex: '\\.(test|spec)\\.(ts|tsx|js|jsx)$',

    moduleNameMapper: {
        '^@app/(.*)$': '<rootDir>/src/$1',
        '@estcube/data-components': '<rootDir>/../data-lib/src',

        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/test/__mocks__/fileMock.js',
        '\\.(css|scss)$': '<rootDir>/test/__mocks__/styleMock.js'
    },

    globals: {
        'ts-jest': {
            tsConfig: '<rootDir>/tsconfig.json'
        }
    }
}
