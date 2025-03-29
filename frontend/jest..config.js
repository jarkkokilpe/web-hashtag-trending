module.exports = {
  preset: 'react-app',
  transformIgnorePatterns: [
    '/node_modules/(?!d3|d3-array|d3-geo)/', // Transform d3 and its submodules
  ],
};