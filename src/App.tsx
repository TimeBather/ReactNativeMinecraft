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
        Ticks:{ticks}
    </>
}

MinecraftGui.render(<>
    <App></App>
</>,minecraft.getGuiContainer());