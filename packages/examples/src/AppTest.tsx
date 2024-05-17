import React, {useEffect, useState} from "react";

import {View} from "react-native-minecraft";

export default function App() {
    const [count,updateCount] = useState(0);
    function handleClick(){
        updateCount(count + 1);
    }
    useEffect(()=>{
        setInterval(updateCount,1000)
    });
    return <>
        <View>Clicked {count} times.</View>
    </>
}