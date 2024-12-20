import React from "react";
import {createContext, useContext, useEffect, useState} from "react";
import {useContextEvent, useGuiContext} from "../renderer";
import {Channel, ChannelHandler} from "@kasugalib/menu";
import type {CompoundTagWrapper} from "@kasugalib/nbt";
import type * as NBT from "@kasugalib/nbt";
import {MapSet} from "../structures";
import {GuiContext} from "../renderer/native/native";

const ChannelIdentifier = createContext("");
const ChannelHandlerIdentifier = createContext<MenuChannelReceiveHandler|null>(null);


const {createCompoundTag} = (__METRO_BOOTSTRAP_MODULE['require']("@kasugalib/nbt") as typeof NBT);


export function MenuChannelComponent(props: {
    id: string,
    children: any
}){
    const currentIdentifier = useContext(ChannelIdentifier);
    return <ChannelIdentifier.Provider value={currentIdentifier ? currentIdentifier + '.' + props.id : props.id}>
        {props.children}
    </ChannelIdentifier.Provider>
}

interface MenuModule{
    getChannel():ChannelHandler
}

export class MenuChannelReceiveHandler {
    guiContext?:GuiContext
    $messageHook: (event:any)=>void = ()=>console.error("Menu Channel Receiver Not Ready!");
    init(guiContext:GuiContext, readyHook:()=>void){
        console.info("MCR Init")
        this.guiContext = guiContext;
        this.$messageHook = (event:any)=>{
            console.info("MCR RX")
            readyHook();
            this.receive(event.getValue());
        };
        const allUpdateRequest = createCompoundTag();
        allUpdateRequest.putString("channel$sync", "init");
        this.sendMessage(allUpdateRequest);
    }

    receive(data:CompoundTagWrapper) {
        let payload = data.getString("channel$update");
        if(!payload || payload.length == 0){
            return;
        }
        const payloadData = JSON.parse(payload);
        this.update(payloadData);
    }

    dataCache: Record<string, any> = {}
    receiveHandler: MapSet<string, (data: any) => void> = new MapSet();

    get(id:string){
        const [data, setData] = useState(this.dataCache[id]);
        useEffect(()=>{
            setData(this.dataCache[id]);
            this.receiveHandler.add(id, setData);
            return ()=>{
                this.receiveHandler.remove(id, setData);
            }
        },[id])
        return data;
    }

    emit(name:string, ...args:any[]){
        const allUpdateRequest = createCompoundTag();
        allUpdateRequest.putString("channel$emit", name);
        allUpdateRequest.putString("channel$emitData", JSON.stringify(args));
        this.sendMessage(allUpdateRequest);
    }

    sendMessage(message: CompoundTagWrapper){
        this.guiContext!
            .getContextModule<MenuModule>("menu")
            .getChannel()
            .sendMessage(message)
    }

    update(payloadData: any, parentPath: string = "") {
        for (const key in payloadData) {
            const data = payloadData[key]
            const currentPath = parentPath ? `${parentPath}.${key}` : key

            if (typeof data === 'object' && data !== null) {
                this.update(data, currentPath)
            } else {
                this.dataCache[currentPath] = data;
                this.receiveHandler.notify(currentPath, (update) => update(data));
            }
        }
    }
}

export function MenuChannelReceiver(props:{children:any}){
    const [ready, setReady] = useState(false);
    const [handler, setHandler] = useState<MenuChannelReceiveHandler|null>(null);
    const guiContext = useGuiContext();
    
    useEffect(() => {
        const handler = new MenuChannelReceiveHandler();
        setHandler(handler);
        handler.init(guiContext, ()=>setReady(true));
    }, [guiContext]);
    
    useContextEvent("message", (e:any)=>handler?.$messageHook(e));

    return <>
        <ChannelHandlerIdentifier.Provider value={handler}> {ready ? props.children : null} </ChannelHandlerIdentifier.Provider>
    </>
}

export function useData(id:string){
    const currentIdentifier = useContext(ChannelIdentifier);
    const receiver = useContext(ChannelHandlerIdentifier);
    if(receiver == null){
        throw new Error("Receiver is null");
    }
    const finalId = currentIdentifier + "." + id;
    return receiver.get(finalId);
}


export function useEmits(id:string){
    const currentIdentifier = useContext(ChannelIdentifier);
    const receiver = useContext(ChannelHandlerIdentifier);
    if(receiver == null){
        throw new Error("Receiver is null");
    }
    const finalId = currentIdentifier + "." + id;
    return (...args:any[])=>receiver.emit(finalId, ...args);
}

export function useNotify(id:string){
    const currentIdentifier = useContext(ChannelIdentifier);
    const receiver = useContext(ChannelHandlerIdentifier);
    useEffect(() => {
        // @TODO
    }, []);
}