import '../src/renderer/native/polyfill';

import React, {useEffect, useState} from "react";
import {MinecraftGui} from "../src/renderer/native/reconciler"
import {} from "../src/renderer/native/native";
import View from "../src/renderer/components/View";

const useEditorTexture = {backgroundImage: 'resource("kasuga_lib:textures/gui/editor.png")'};

function Editor() {
    return <>
        <View style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <View style={{
                width: '400',
                height: '200'
            }}>
                <View style={{
                    positionType: 'absolute',
                    top: '24',
                    left: '8',
                    width: '335',
                    height: '175.5',
                    ...useEditorTexture,
                    backgroundUV: '0 400 670 351'

                }}>
                </View>
                <View style={{
                    positionType: 'absolute',
                    top: '0',
                    left: '0',
                    width: '400',
                    height: '200',
                    ...useEditorTexture,
                    backgroundUV: '0 0 800 400'
                }}>
                    <View class="title" style={{justifyContent: "center", alignItems: 'center', height: '16'}}>
                        编辑器
                    </View>
                    <View style={{ flexDirection:'row',height:'184'}}>
                        <View style={{width:'8.5',height:'100%'}}>

                        </View>
                        <View style={{width:'335',height:'100%'}}>
                            <View style={{height:'8',flexDirection:'row'}}>
                                {["file1","file2","file3"].map((name)=>{
                                    return <View style={{
                                        ...useEditorTexture,
                                        width:'32',
                                        height:'8',
                                        backgroundUV:'704 400 64 16'
                                    }}>{name}</View>
                                })}
                            </View>
                        </View>
                        <View style={{width:'55',height:'100%'}}>
                            <View style={{alignItems:'center'}}>
                                <View style={{...useEditorTexture,backgroundUV:'797 416 97 32',width:'48.5',height:'16'}}></View>
                            </View>
                        </View>
                    </View>
                </View>

            </View>
        </View>
    </>
}

MinecraftGui.render(<>
    <Editor></Editor>
</>, minecraft.getGuiContainer());