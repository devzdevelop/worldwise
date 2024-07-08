/** @type {import("prettier").Config} */
const config = {
  bracketSpacing: true,
  jsxSingleQuote: true,
  // Removed the Tailwind CSS plugin
  printWidth: 80,
  quoteProps: 'consistent',
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
};

module.exports = config;
