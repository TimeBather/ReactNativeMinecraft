// @flow
import './Libraries/Core/Polyfills'
console.info("Loading React Native Instance")
if(__DEV__){
    if(!global['hooked']){
        global['hooked'] = true;
        const HmrHook = window['__REACT_DEVTOOLS_GLOBAL_HOOK__'];
        delete window['__REACT_DEVTOOLS_GLOBAL_HOOK__'];
        require("react-devtools-core");
        const devToolsHook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
        const fiberIdMap = new Map();
        ['inject','onScheduleFiberRoot','onCommitFiberRoot','onCommitFiberUnmount'].forEach((n)=>{
            if(devToolsHook[n]){
                let originalHook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__[n];
                window.__REACT_DEVTOOLS_GLOBAL_HOOK__[n] = function(...args){
                    console.info("[RNative Call] "+ n+",args="+args.join(","))
                    console.info("[RNative Call] Redirect to HMR "+ n+",args="+args.join(","))
                    let hmrResp = HmrHook[n].bind(HmrHook)(...args);
                    if( n === 'onScheduleFiberRoot' || n === 'onCommitFiberRoot'){
                        args[0] = fiberIdMap.get(args[0]);
                    }
                    console.info("[RNative Call] Redirect to HMR "+ n+",args="+args.join(","))
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
    }
}

export * from './Libraries/Core/InitializeCore'
import AppRegistry from './Libraries/ReactNative/AppRegistry'
export {AppRegistry}