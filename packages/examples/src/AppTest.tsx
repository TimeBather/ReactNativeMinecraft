import React, {useEffect, useState} from "react";
import {View, Text} from "react-native-minecraft";
const backgroundImage = require('./assets/devices.png')

export default function App() {
    const [count, setCount] = useState(0);
    return <>
            <View>
                <View style={{
                    height: '212',
                    width: '256',
                    backgroundImage,
                    backgroundUV:"0 0 10 10",
                    backgroundRenderType:"nine_slice",
                    backgroundNineSliceParam:"5 0.75"
                }}>
                    <DataArea childrenStyle={{
                        height:'20',
                        width:'20',
                        top:'3',
                        left:'3'
                    }}>
                    </DataArea>
                    <OuterFrame childrenStyle={{
                        height:'5',
                        width:'10',
                        top:'3',
                        left:'23'
                    }}>
                    </OuterFrame>
                    <OuterFrame childrenStyle={{
                        height:'5',
                        width:'10',
                        top:'8',
                        left:'23'
                    }}></OuterFrame>
                    <OuterFrame childrenStyle={{
                        height:'5',
                        width:'10',
                        top:'13',
                        left:'23'
                    }}></OuterFrame>
                    <OuterFrame childrenStyle={{
                        height:'5',
                        width:'10',
                        top:'18',
                        left:'23'
                    }}></OuterFrame>
                    <BigDataAreaWithText childrenStyle={{
                        height:'24',
                        width:'25',
                        top:'3',
                        left:'40'
                    }} data="200" color="#00E000">

                    </BigDataAreaWithText>

                    <BigDataAreaWithText childrenStyle={{
                        height:'24',
                        width:'25',
                        top:'3',
                        left:'75'
                    }} data="350" color="#FF0000"></BigDataAreaWithText>

                    <BigDataAreaWithText childrenStyle={{
                        height:'24',
                        width:'45',
                        top:'3',
                        left:'110'
                    }} data="65535" color="#FFFF80"></BigDataAreaWithText>

                    <NextSignal childrenStyle={{
                        top:'3',
                        left:'170'
                    }} name="进站  33440"></NextSignal>

                    <MileageData childrenStyle={{
                        top:'12',
                        left:'170'
                    }} mileage="000000.00"></MileageData>
                    <DataArea childrenStyle={{
                        height:'24',
                        width:'38',
                        top:'3',
                        left:'215'
                    }}></DataArea>

                    <DataArea childrenStyle={{
                        height:'120',
                        width:'215',
                        top:'35',
                        left:'20'
                    }}></DataArea>
                    <DataArea childrenStyle={{
                        height:'40',
                        width:'215',
                        top:'155',
                        left:'20'
                    }}></DataArea>
                    { count % 2 == 0 ? <InfoDialog childrenStyle={{
                        top:'82',
                        left:'88',
                        width:'80',
                        height:'48'
                    }}>
                        <Text style={{
                            positionType: "absolute",
                            top: "1",
                            left: "1",
                        }}
                              content="注意"
                              color='#FFFFFF'
                              fontSize="5"
                              fontWidth="1"
                              textAlign="topLeft"/>
                        <Text style={{
                            positionType: "absolute",
                            top: "16",
                            left: "48",
                        }}
                              content="手柄防溜倒计时"
                              color='#00FF00'
                              fontSize="6"
                              fontWidth="1"
                              textAlign="center"/>
                        <Text style={{
                            positionType: "absolute",
                            top: "32",
                            left: "40",
                        }}
                              content="10"
                              color='#FF0000'
                              fontSize="12"
                              fontWidth="1"
                              textAlign="center"/>
                    </InfoDialog>
                    :<></>}
                </View>
                <View style={{
                    height: '32',
                    width: '256',
                    backgroundImage,
                    backgroundUV:"0 10 10 10",
                    backgroundRenderType:"nine_slice",
                    backgroundNineSliceParam:"5 0.75"
                }}>

                </View>
                <View onclick={()=>setCount(count + 1)}>
                    OKTR
                </View>

            </View>
    </>
}

export function Panel(props:any){
    return <>
        <View style={{
            positionType:'absolute',
            backgroundImage,
            backgroundUV:"0 0 10 10",
            backgroundRenderType:"nine_slice",
            backgroundNineSliceParam:"3 0.75",
            ...props.childrenStyle
        }}>
        </View>
    </>
}

export function OuterFrame(props:any){
    return <>
        <View style={{
            positionType:'absolute',
            backgroundImage,
            backgroundUV:"10 0 10 10",
            backgroundRenderType:"nine_slice",
            backgroundNineSliceParam:"3 0.25",
            ...props.childrenStyle
        }}>
        </View>
    </>
}

export function Input(props:any){
    return <>
        <View style={{
            positionType:'absolute',
            backgroundImage,
            backgroundUV:"20 0 10 10",
            backgroundRenderType:"nine_slice",
            backgroundNineSliceParam:"3 0.75",
            ...props.childrenStyle
        }}>
        </View>
    </>
}

export function InnerFrame(props:any){
    return <>
        <View style={{
            positionType:'absolute',
            backgroundImage,
            backgroundUV:"30 0 10 10",
            backgroundRenderType:"nine_slice",
            backgroundNineSliceParam:"3 0.75",
            ...props.childrenStyle
        }}>
        </View>
    </>
}

export function SelectButton(props:any){
    return <>
        <View style={{
            positionType:'absolute',
            backgroundImage,
            backgroundUV:"0 10 24 24",
            ...props.childrenStyle
        }}>
        </View>
    </>
}

export function InfoDialog(props:any){
    return <>
        <View style={{
            positionType:'absolute',
            backgroundImage,
            backgroundUV:"24 10 24 24",
            backgroundRenderType:"nine_slice",
            backgroundNineSliceParam:"11 0.75",
            ...props.childrenStyle
        }}>
            {props.children}
        </View>
    </>
}

export function DataArea(props:any){
    return <>
        <View style={{
            positionType:'absolute',
            backgroundImage,
            backgroundUV:"0 34 10 10",
            backgroundRenderType:"nine_slice",
            backgroundNineSliceParam:"3 0.3",
            ...props.childrenStyle
        }}>
            {props.children}
        </View>
    </>
}

export function BigDataAreaWithText(props: any){
    return <>
        <DataArea childrenStyle={props.childrenStyle}>
            <Text style={{
                position: "absolute",
                top: "3",
                left: props?.childrenStyle?.width ? (parseInt(props.childrenStyle.width)).toString() : "25",
            }}
                  content={props?.data ?? '0'}
                  color={props?.color ?? '#FFFFFF'}
                  fontSize={props?.size ?? "21"}
                  fontWidth="0.5"
                  textAlign="rightTop"/>
        </DataArea>
    </>
}

export function NextSignal(props: any){
    return <>
        <DataArea childrenStyle={{
            height:'9',
            width:'45',
            ...(props.childrenStyle)
        }}>
            <Text style={{
                position: "absolute",
                top: "2",
                left: "1",
            }}
                  content={props?.name ?? '-- ------'}
                  color={props?.color ?? '#FFFFFF'}
                  fontSize={props?.size ?? "5"}
                  fontWidth="1"
                  textAlign="leftTop"/>
        </DataArea>
    </>
}

export function MileageData(props:any){
    return <>
        <DataArea childrenStyle={{
            height:'15',
            width:'45',
            ...(props.childrenStyle)
        }}>
            <Text style={{
                position: "absolute",
                top: "2",
                left: "44",
            }}
                  content={props?.mileage ?? '0'}
                  color={props?.color ?? '#FFFF80'}
                  fontSize={props?.size ?? "12"}
                  fontWidth="0.5"
                  textAlign="rightTop"/>
        </DataArea>
    </>
}