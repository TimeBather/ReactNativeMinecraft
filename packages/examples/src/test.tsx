import React from "react";
import {AppRegistry} from "react-native";
import {View} from "react-native-minecraft";

function App(){
    return <>
        <View>
            Hello,World
        </View>
    </>
}

AppRegistry.registerComponent("App",() => App);

AppRegistry.runApplication("App",{});