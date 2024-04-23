import {minecraft} from "global";

interface MinecraftNative{
    getGuiContainer(): MinecraftNativeGuiModule;
    requestInterval(callback:()=>void,interval:number);
    requestTimeout(callback:()=>void,timeout:number);
    clearSchedule(id:number);
}

interface MinecraftNativeGuiModule{
    createElement(type:string,props:string):MinecraftNativeElement;
    appendElement(element:MinecraftNativeElement);
    removeElement(element:MinecraftNativeElement);
}

interface MouseContent{
    x:number,
    y:number,
    button:number
}

interface MinecraftNativeElement {
    setElementContent(content:string);
    addChild(element:MinecraftNativeElement);
    removeChild(element:MinecraftNativeElement);
    listenMouse(eventName:string,callback:(mouseContext:MouseContent)=>boolean);
}

declare global{
    const minecraft : MinecraftNative;
}