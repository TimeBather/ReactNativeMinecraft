const findRoot = require("find-root");
const getWorkspaces = require('get-yarn-workspaces');
const path = require("path");

module.exports = function(projectPath) {
    const workspaces = getWorkspaces(projectPath);
    return {
        watchFolders: [
            ...workspaces,
            path.resolve(projectPath, '../../node_modules')
        ],
        resolver:{
            blacklistRE: workspaces.map(
                workspacePath =>
                    new RegExp(
                        `^${encodeURIComponent(path.resolve(projectPath, workspacePath, 'node_modules'))}\\/.*$`
                    ),
            ),
            // https://github.com/facebook/metro/issues/1#issuecomment-453450709
            extraNodeModules: new Proxy({}, {
                get: (target, name) => {
                    return path.join(findRoot(projectPath), `node_modules/${name}`);
                }
            })
        }
    }
}