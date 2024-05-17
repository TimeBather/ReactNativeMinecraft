// @flow
import './Libraries/Core/Polyfills'
const HmrHook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
globalThis.window = {};
require("react-devtools-core");
const devToolsHook = globalThis.window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
globalThis.window = globalThis;
Object.defineProperty(window,'__REACT_DEVTOOLS_GLOBAL_HOOK__',{value:devToolsHook});
const fiberIdMap = new Map();
['inject','onScheduleFiberRoot','onCommitFiberRoot','onCommitFiberUnmount'].forEach((n)=>{
    if(devToolsHook[n]){
        let originalHook = devToolsHook[n];
        devToolsHook[n] = function(...args){
            console.info("[RNative Call] "+ n+",args="+args.join(","))
            let hmrResp = HmrHook[n].bind(devToolsHook)(...args);
            if( n === 'onScheduleFiberRoot' || n === 'onCommitFiberRoot'){
                args[0] = fiberIdMap.get(args[0]);
            }
            let originalResp = originalHook.bind(devToolsHook)(...args);
            if( n === 'inject' ){
                fiberIdMap.set(hmrResp,originalResp);
            }
            console.info("[RNative Call Response] "+ n+",args="+args.join(",")+',originResp='+originalResp+'hmrResp='+hmrResp)
            return hmrResp;
        }
    }else devToolsHook[n] = HmrHook[n];
})
HmrHook['renderers'].forEach = function(...args){
    return devToolsHook['renderers'].forEach(...args);
}
console.info("CBB",Object.keys(window['__REACT_DEVTOOLS_GLOBAL_HOOK__']));

export * from './Libraries/Core/InitializeCore'
import AppRegistry from './Libraries/ReactNative/AppRegistry'
export {AppRegistry}