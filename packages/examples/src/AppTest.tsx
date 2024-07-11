import React, {useEffect, useState} from "react";
import {View} from "react-native-minecraft";
const backgroundImage = require('./assets/devices.png')

export default function App() {
    const [count, setCount] = useState(0);
    return <>
        {count % 2 == 0 ?
            <View style={{
                marginLeft:'20',
                marginTop:'20'
            }}>
                <View style={{
                    height: '96',
                    width: '128',
                    backgroundImage,
                    backgroundUV:"0 0 10 10",
                    backgroundRenderType:"nine_slice",
                    backgroundNineSliceParam:"5 0.5"
                }}>
                    <Panel childrenStyle={{
                        height:'10',
                        width:'10',
                        top:'1.5',
                        left:'1.5'
                    }}/>
                    {count}
                </View>
            </View>
            : <View></View>
        }
        <View onclick={()=>setCount(count + 1)}>
            OK
        </View>
    </>
}

function Panel(props:any){
    return <>
        <View style={{
            positionType:'absolute',
            backgroundUV:"0 0 10 10",
            backgroundImage,
            backgroundRenderType:"nine_slice",
            backgroundNineSliceParam:"5 2",
            ...props.childrenStyle
        }}>

        </View>
    </>
}