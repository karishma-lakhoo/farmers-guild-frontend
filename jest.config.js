module.exports = {
    preset: "react-native",
    roots: ['<rootDir>/'],
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.{js,jsx}'
    ],
    coverageReporters: ['lcov', 'text-summary','text'],
    coverageDirectory: './coverage'
}