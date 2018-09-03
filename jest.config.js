module.exports = {
  verbose: true,
  setupFiles: [
    'jest-localstorage-mock',
  ],
  testPathIgnorePatterns: [
    './node_modules/',
    '<rootDir>/client/mocks/*.js',
    '<rootDir>/client/helpers/*.js',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/mocks/file.js',
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'client/**/*.{js,jsx}',
    '!client/app.jsx',
    '!client/mocks/**.js',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/__tests__/',
    '/helpers/',
    '/mocks/',
    '/store/',
    '/public/',
  ],
};
