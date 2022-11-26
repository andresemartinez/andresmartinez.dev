/** @type {import('prettier').Config} */
module.exports = {
  arrowParens: "always",
  printWidth: 80,
  singleQuote: false,
  jsxSingleQuote: false,
  semi: true,
  trailingComma: "all",
  tabWidth: 2,
  bracketSameLine: true,
  endOfLine: "lf",
  plugins: [
    require.resolve("prettier-plugin-astro"),
    require.resolve("prettier-plugin-tailwindcss"), // MUST come last
  ],
  pluginSearchDirs: false,
  astroAllowShorthand: false,
  tailwindConfig: "./tailwind.config.cjs",
};
