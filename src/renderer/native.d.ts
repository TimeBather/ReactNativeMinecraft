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

interface MinecraftNativeElement {
    setElementContent(content:string);
}

declare global{
    const minecraft : MinecraftNative;
}