const { getDefaultConfig } = require("expo/metro-config");
const { withUniwindConfig } = require("uniwind/metro");

/** @type {import('expo/metro-config').MetroConfig Config} */

/**
 * @param {Config} config
 * @returns {Config}
 */
const withDrizzleConfig = (config) => {
  return {
    ...config,
    resolver: {
      ...config.resolver,
      sourceExts: [...config.resolver.sourceExts, "sql"],
    },
  };
};

module.exports = withUniwindConfig(
  withDrizzleConfig(getDefaultConfig(__dirname)),
  {
    cssEntryFile: "./src/global.css",
    dtsFile: "./src/uniwind-types.d.ts",
  },
);
