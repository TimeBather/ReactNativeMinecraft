const ReactRefreshRuntime = require('react-refresh/runtime');
ReactRefreshRuntime.injectIntoGlobalHook(globalThis);
const Refresh = {
    performFullRefresh(reason:any) {
        console.info("Reload:"+reason)
    },

    createSignatureFunctionForTransform:
    ReactRefreshRuntime.createSignatureFunctionForTransform,

    isLikelyComponentType: function(...args:any[]){
        let result = ReactRefreshRuntime.isLikelyComponentType(...args);
        console.info("isLikelyComponentType",result,Object.keys(args[0]));
        return result;
    },

    getFamilyByType: ReactRefreshRuntime.getFamilyByType,

    register: function(...args:any[]){
        ReactRefreshRuntime.register(...args);
    },

    performReactRefresh() {
        console.info("Refresh successful")
        ReactRefreshRuntime.performReactRefresh();
    },
};

// The metro require polyfill can not have dependencies (applies for all polyfills).
// Expose `Refresh` by assigning it to global to make it available in the polyfill.
// @ts-ignore
globalThis[ (globalThis.__METRO_GLOBAL_PREFIX__ || '') + '__ReactRefresh'] = Refresh;
