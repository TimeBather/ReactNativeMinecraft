if(__DEV__){
    const MetroHMRClient = require("metro-runtime/src/modules/HMRClient");

    const client = new MetroHMRClient('ws://127.0.0.1:8081/hot');
    client.on('update-start', ({isInitialUpdate}:any) => {
        console.info("Updating.....")
    });
    client.enable();
    client.send(
        JSON.stringify({
            type: 'register-entrypoints',
            entryPoints: [`ws://${globalThis['HMRServer'] ?? "127.0.0.1:8081"}/hot?bundleEntry=${globalThis['HMREntry'] ?? "client/index.bundle"}&platform=minecraft`],
        }),
    );
}