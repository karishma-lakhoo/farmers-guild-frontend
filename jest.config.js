module.exports = {
    preset: "jest-expo",
    roots: ['<rootDir>/'],
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.{js,jsx}'
    ],
    coverageReporters: ['lcov', 'text-summary','text'],
    coverageDirectory: './coverage'
}