import type {ReactReconcilerInstance} from "../renderer";
let connectToDevTools = (arg:object)=>null;
if(__DEV__){
    connectToDevTools = require("react-devtools-core").connectToDevTools;
}

export function connectDevtools(reconciler: typeof ReactReconcilerInstance) {
    if (connectToDevTools && __DEV__) {
        // @ts-ignore
        // console.info("Windows Devtools Hook:",Object.keys(window.__REACT_DEVTOOLS_GLOBAL_HOOK__));
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