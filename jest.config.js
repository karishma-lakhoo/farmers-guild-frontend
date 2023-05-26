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

  
}

