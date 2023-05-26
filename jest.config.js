module.exports = {
    preset: "react-native",
    verbose: true,
    roots: ['<rootDir>/'],
    collectCoverage: true,
    // collectCoverageFrom: [
    //     'src/**/*.{js,jsx}'
    // ],
    coverageReporters: ['lcov', 'text-summary','text'],
    coverageDirectory: './coverage',
    transform: {
        "^.+\\.(js|jsx)$": "babel-jest",
    },
    moduleNameMapper: {
        '^react-native-svg$': '<rootDir>/__mocks__/react-native-svg.js',

    },

    // transformIgnorePatterns: [
    //     "/node_modules/(?!react-native)/"
    // ],
    // globals: {
    //     "ts-jest": {
    //         "babelConfig": true,
    //         "tsconfig": "<rootDir>/tsconfig.jest.json"
    //     }
    // },
    // testMatch: [
    //     "<rootDir>/src/**/__tests__/**/*.{js,jsx}"
    // ],
    // moduleNameMapper: {
    //     "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    // },
    // moduleFileExtensions: [
    //     "js",
    //     "jsx",
    // ],
    // moduleDirectories: [
    //     "node_modules",
    //     "<rootDir>/src"
    // ],
}
