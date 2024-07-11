const path = require("path");

module.exports = function(projectPath){
    return {
        projectRoot: projectPath,

        resolver: {
            hasteImplModulePath: require.resolve('../jest/hasteImpl'),
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

        serializer:{
            getRunModuleStatement(moduleId){
                return `if(!globalThis['__METRO_BOOTSTRAP_MODULE']) globalThis['__METRO_BOOTSTRAP_MODULE'] = module;__r(${moduleId});`
            }
        },
    }
}