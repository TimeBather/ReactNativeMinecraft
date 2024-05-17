"use strict";
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

var path = require("path");
const defaultPolyfills = require("react-native/rn-get-polyfills");

var config = mergeConfig(getDefaultConfig(path.resolve('.')),{
    resolver: {
        hasteImplModulePath: require.resolve('./jest/hasteImpl'),
        platforms: ["minecraft"],
        providesModuleNodeModules: ["react-native-minecraft"],
    },

});

module.exports = config;