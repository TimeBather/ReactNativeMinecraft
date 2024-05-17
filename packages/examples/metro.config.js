// https://gist.github.com/sibelius/53b3ea832d9b0d46b7b3903c6d842b85
const path = require('path');

const { FileStore } = require('metro-cache');

const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const getWorkspaces = require('get-yarn-workspaces');

const workspaces = getWorkspaces(__dirname);

module.exports = mergeConfig(getDefaultConfig(path.resolve('.')),{
    projectRoot: path.resolve(__dirname, '.'),

    watchFolders: [
        path.resolve(__dirname, '../../node_modules'),
        ...workspaces,
    ],

    resolver: {
        blacklistRE: workspaces.filter(workspacePath => workspacePath.indexOf('packages/app') === -1).map(
            workspacePath =>
                new RegExp(
                    `^${escape(path.resolve(__dirname, workspacePath, 'node_modules'))}\\/.*$`
                ),
        ),
        // https://github.com/facebook/metro/issues/1#issuecomment-453450709
        extraNodeModules: new Proxy({}, {
            get: (target, name) => path.join(process.cwd(), `node_modules/${name}`),
        }),
        hasteImplModulePath: require.resolve('./jest/hasteImpl'),
        platforms: ["minecraft"],
        providesModuleNodeModules: ["react-native-minecraft"],
    },

    // http://facebook.github.io/react-native/blog/2019/03/12/releasing-react-native-059#faster-app-launches-with-inline-requires
    transformer: {
        getTransformOptions: async () => ({
            transform: {
                experimentalImportSupport: false,
                inlineRequires: true,
            },
        }),
    },

    cacheStores: [
        new FileStore({
            root: path.join(__dirname, 'metro-cache'),
        }),
    ],

});