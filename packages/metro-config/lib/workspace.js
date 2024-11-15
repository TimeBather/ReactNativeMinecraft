const findWorkspaces = require('find-workspaces');
const path = require("path");

function findRoot(cwd){
    return findWorkspaces.findWorkspacesRoot(cwd).location;
}

function getWorkspaces(cwd){
    return findWorkspaces.findWorkspaces(cwd).map(t=>t.location)
}

module.exports = function(projectPath) {
    const workspaces = getWorkspaces(projectPath);
    return {
        watchFolders: [
            ...workspaces,
            path.resolve(findRoot(projectPath), 'node_modules')
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
                    console.info(name, '->', path.join(findRoot(projectPath), `node_modules/${name}`))
                    return path.join(findRoot(projectPath), `node_modules/${name}`);
                }
            })
        }
    }
}