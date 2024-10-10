import {DomNode, StyleSheet, StyleSheetNode} from "./native";
const isEqual = (x:any , y:any) => {
    /* use from radash.js, MIT LICENSE */
    if (Object.is(x, y))
        return true;
    if (x instanceof Date && y instanceof Date) {
        return x.getTime() === y.getTime();
    }
    if (x instanceof RegExp && y instanceof RegExp) {
        return x.toString() === y.toString();
    }
    if (typeof x !== "object" || x === null || typeof y !== "object" || y === null) {
        return false;
    }
    const keysX = Reflect.ownKeys(x);
    const keysY = Reflect.ownKeys(y);
    if (keysX.length !== keysY.length)
        return false;
    for (let i = 0; i < keysX.length; i++) {
        if (!Reflect.has(y, keysX[i]))
            return false;
        if (!isEqual(x[keysX[i]], y[keysX[i]]))
            return false;
    }
    return true;
};

export const SpecialProcessAttributes : Record<string, false | {if:(node:DomNode,oldValue:any,newValue:any)=>boolean|null,update:(node:DomNode,oldValue:any,newValue:any)=>void} | undefined> = {
    "children":false,
    "style":{
        if:(node: DomNode,oldValue,newValue)=>{
            if(!node.hasFeature("style"))
                return null;
            return !isEqual(oldValue,newValue);
        },
        update(node,oldProp, newProp){
            if(!node.hasFeature("style"))
                return;
            const style = (node as unknown as StyleSheetNode).styles;
            let allKeys = [...Object.keys(oldProp ?? {}),...Object.keys(newProp ?? {})];
            for (let key of allKeys) {
                if(oldProp?.[key] !== newProp?.[key]){
                    if(!(newProp?.[key])){
                        style.removeStyle(key);
                    }else{
                        style.setStyle(key,newProp[key]);
                    }
                }
            }
        }
    },
    "onclick":{
        if:(node: DomNode,oldValue,newValue)=>null,
        update(node,oldProp, newProp){
            if (oldProp) {
                node.removeEventListener("click", oldProp);
            }
            if (newProp) {
                node.addEventListener("click", newProp);
            }
        }
    }
}
export function getAttributeUpdatePayload(node: DomNode, oldProps: Record<string|symbol,any>, newProps: Record<string|symbol,any>){
    let allKeys = [...Object.keys(oldProps),...Object.keys(newProps)];
    const updateData : Record<string, {oldProp:any,newProp:any}> = {};
    for (let key of allKeys) {
        const specialProcess = SpecialProcessAttributes[key];
        if(specialProcess === false)
            continue;
        const oldProp = oldProps[key];
        const newProp = newProps[key];

        let shouldUpdate = null;

        if(specialProcess){
            shouldUpdate = specialProcess.if(node, oldProp, newProp);
        }

        if(shouldUpdate === null){
            shouldUpdate = !isEqual(oldProp,newProp);
        }

        if(!shouldUpdate)
            continue;

        updateData[key] = {oldProp,newProp};
    }
    return updateData;
}

export function updateAttribute(node:DomNode, payload:Record<string, {oldProp:any,newProp:any}>){
    const keys = Object.keys(payload);
    for (let key of keys) {
        const specialProcess = SpecialProcessAttributes[key];
        if(specialProcess){
            specialProcess.update(node,payload[key].oldProp,payload[key].newProp);
        }else{
            node.setAttribute(key,payload[key].newProp);
        }
    }
}

export function setInitialAttribute(node:DomNode, props:Record<string,any>){
    const payload = getAttributeUpdatePayload(node,{},props);
    updateAttribute(node,payload);
}