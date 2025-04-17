module.exports = {
  transformIgnorePatterns: [
    // Change the default pattern to exclude axios from being transformed
    "node_modules/(?!(axios)/)"
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
  }
};
