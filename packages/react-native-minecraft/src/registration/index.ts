import type {GuiContext} from "../renderer/native/native";
import {MinecraftGui} from "../renderer";
import {AppRegistry as ReactAppRegistry} from "react-native";

const Registries : {getRegistry:(name:string)=>Registry} = globalThis.require("@kasugalib/registry");

interface Registry{
    register(location:string,item:any):void;
}

export namespace AppRegistry{
    export function registerGuiComponent(location:string,component:any){
        ReactAppRegistry.registerComponent(location,component);
        Registries.getRegistry("kasuga_lib:gui").register(location,(context:GuiContext)=>{
            const app = ReactAppRegistry.runApplication(location,{
                initialProps: context,
                rootTag: context
            }) as unknown as {unmount:()=>void};

            return ()=>app.unmount();
        });
    }
}