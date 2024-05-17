globalThis.self = globalThis;
globalThis.window = globalThis;

let memory : Record<number, any[]> = {};

globalThis.setTimeout = function(handler:TimerHandler, timeout:number,...args:any[]){
    console.info("SetTimeout called",handler.toString())
    let id : number;
    if(timeout === undefined)
        timeout = 1;
    if(timeout < 50){
        timeout = 50;
    }
    id = minecraft.requestTimeout(()=>{
        if(typeof handler == 'string'){
            throw new Error("Dynamic interpolating is not supported yet.")
        }else{
            handler(...memory[id]);
        }
    },timeout);
    if(id == null || id === -1){
        throw new Error("Failed to request timer")
    }
    memory[id] = args;
    return id;
}

globalThis.setInterval = function(handler:TimerHandler, interval:number,...args:any[]){
    console.info("SetInterval called",handler.toString())
    let id : number;
    if(interval === undefined)
        interval = 1;
    if(interval < 50){
        interval = 50;
    }
    id = minecraft.requestInterval(()=>{
        if(typeof handler == 'string'){
            throw new Error("Dynamic interpolating is not supported yet.")
        }else{
            handler(...memory[id]);
        }
    },interval);
    if(id == null || id === -1){
        throw new Error("Failed to request ")
    }
    memory[id] = args;
    return id;
};

globalThis.clearTimeout = globalThis.clearInterval = function(handler){
    if(handler === undefined){
        return;
    }
    minecraft.clearSchedule(handler);
    delete memory[handler];
}
