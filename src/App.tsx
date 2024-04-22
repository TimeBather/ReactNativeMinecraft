import './renderer/polyfill';

import React, {useEffect, useState} from "react";
import {MinecraftGui} from "./renderer/reconciler"
import {} from "react-dom";
import {} from "./renderer/native";
import View from "./renderer/components/View";

function App(){
    const [ticks, setState] = useState(0);
    useEffect(()=>{
        let interval = setInterval(()=>{
            setState(ticks + 1);
        },50);
        return ()=>clearInterval(interval);
    });
    return <>
        <View style={{
            width:'100',
            height:'100',
            backgroundImage:'resource("kasuga_lib:textures/gui/pixel.png")',
            backgroundUV:'0 0 32 32'
        }}></View>
        <View style={{
            width:'100',
            height:'100',
            backgroundImage:'resource("kasuga_lib:textures/gui/pixel.png")',
            backgroundUV:'0 0 16 16'
        }}></View>
    </>
}

MinecraftGui.render(<>
    <App></App>
</>,minecraft.getGuiContainer());