/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "jsdom",
  collectCoverage: true,
  coverageDirectory: "coverage",
  testPathIgnorePatterns: ["/node_modules/"],
  moduleFileExtensions: ["js", "jsx", "json", "node"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
};
