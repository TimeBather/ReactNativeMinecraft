// https://gist.github.com/sibelius/53b3ea832d9b0d46b7b3903c6d842b85
const path = require('path');

const { FileStore } = require('metro-cache');
const findRoot = require('find-root');

const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const getReactNativeMinecraftConfig = require('react-native-minecraft-metro-config')
const getReactNativeWorkspaceConfig = require('react-native-minecraft-metro-config/lib/workspace')


module.exports = mergeConfig(
    getDefaultConfig(path.resolve('.')),
    getReactNativeMinecraftConfig(path.resolve(".")),
    getReactNativeWorkspaceConfig(path.resolve(".")),
    {
    cacheStores: [
        new FileStore({
            root: path.join(__dirname, 'metro-cache'),
        }),
    ]
});