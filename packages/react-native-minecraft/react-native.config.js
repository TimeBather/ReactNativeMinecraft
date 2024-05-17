module.exports = {
    platforms:{
        "minecraft":{
            linkConfig:()=>null,
            projectConfig:()=>null,
            dependencyConfig:()=>null,
            npmPackageName:'react-native-minecraft/react-native'
        }
    },
    transformer: {
        getTransformOptions: async () => ({
            transform: {
                experimentalImportSupport: false,
                inlineRequires: true,
            },
        }),
    },
}