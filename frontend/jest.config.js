module.exports = {
  preset: 'react-app',
  transformIgnorePatterns: [
    '/node_modules/(?!d3|d3-array|d3-geo|d3-scale|d3-shape)/', // Include d3 and its submodules
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Use babel-jest to transform files
  },
  testEnvironment: 'jsdom', // Ensure the test environment is set to jsdom for React
};