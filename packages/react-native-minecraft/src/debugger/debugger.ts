import './websocket'
import type {ReactReconcilerInstance} from "../renderer";
let connectToDevTools = (arg:object)=>null;
if(minecraft.isDebugging()){
    connectToDevTools = require("react-devtools-core").connectToDevTools;
}

export function connectDevtools(reconciler: typeof ReactReconcilerInstance) {
    if (connectToDevTools) {
        // @ts-ignore
        console.info("Windows Devtools Hook:",Object.keys(window.__REACT_DEVTOOLS_GLOBAL_HOOK__));
        connectToDevTools({
            host: "localhost",
            port: 8097,
            resolveRNStyle: null
        });
        reconciler.injectIntoDevTools({
            bundleType: 1,
            version: "2.0.0",
            rendererPackageName: "react-native-minecraft",
            //@ts-ignore
            findHostInstanceByFiber: reconciler.findHostInstance
        });
    }
}