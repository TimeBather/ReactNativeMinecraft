import ReactReconciler, {HostConfig} from "react-reconciler";
import {MinecraftNative, MinecraftNativeElement, MinecraftNativeGuiModule} from "./native";
import _ from "lodash";

let currentContainer;

function commitMouseEvents(element: MinecraftNativeElement, props: Record<string, any>){
    Object.keys(props).forEach((propName)=>{
        console.info(" - "+propName+" = "+ props[propName].toString())
        switch (propName){
            case 'onclick':
                element.listenMouse(propName.substring(2),function (ctx){return props[propName](ctx)});
        }
    })
}

const MinecraftNativeReconcilerConfig: Partial<HostConfig<
        any,
        Record<string, any>,
        MinecraftNativeGuiModule,
        MinecraftNativeElement,
        MinecraftNativeElement,
        any, any, any, any, any, any, any, any>> = {
    getRootHostContext(rootContainer: MinecraftNativeGuiModule) {

    },
    prepareForCommit(containerInfo: MinecraftNativeGuiModule) {
        return null;
    },
    getChildHostContext(parentHostContext: any) {
        return parentHostContext;
    },
    clearContainer() {

    },
    shouldSetTextContent() {
        return false;
    },
    resetAfterCommit(containerInfo: MinecraftNativeGuiModule) {
        // 在 commit 阶段后执行一次 renderAll 更新 canvas
        // containerInfo.renderAll();
    },
    createInstance(type: string, props: Record<string, any>, rootContainer: MinecraftNativeGuiModule, hostContext: MinecraftNative, internalHandle: ReactReconciler.OpaqueHandle){
        console.info("Creating instance of " + type + ",props:",props)
        let serializedProp : Record<string, any> = {};
        Object.keys(props).forEach(propName => {
            switch (propName){
                case 'children': break;
                case 'onclick': break;
                default:
                    console.info(" - Copy prop " + propName + ", value = " , serializedProp , " to Native Host Serializer")
                    serializedProp[propName] = props[propName];
            }
        });
        console.info("Commit props:" ,JSON.stringify(serializedProp))
        let element = rootContainer.createElement(type, JSON.stringify(serializedProp));
        commitMouseEvents(element,props);
        return element;
    },
    createTextInstance(text: any, rootContainer: MinecraftNativeGuiModule, hostContext: any, internalHandle: any) {
        const element = rootContainer.createElement("text","{}");
        element.setElementContent(text);
        return element;
    },
    removeChildFromContainer(container: MinecraftNativeGuiModule, child: MinecraftNativeElement) {
        container.removeElement(child);
    },
    appendChildToContainer(container:MinecraftNativeGuiModule, child:MinecraftNativeElement){
        console.info(`Append ${JSON.stringify(child)} to container!`);
        container.appendElement(child);
    },

    appendInitialChild(parentInstance: MinecraftNativeElement, child: MinecraftNativeElement) {
        parentInstance.addChild(child);
    },

    removeChild(parentInstance: MinecraftNativeElement, child: MinecraftNativeElement) {
        parentInstance.removeChild(child);
    },

    commitTextUpdate(element: MinecraftNativeElement, oldText: string, newText: string) {
        element.setElementContent(newText);
    },

    commitUpdate(instance: MinecraftNativeElement,
                 updatePayload: any,
                 type: any,
                 prevProps: Record<string, any>,
                 nextProps: Record<string, any>,
                 internalHandle: ReactReconciler.OpaqueHandle
    ) {
        console.info("Update payload: "+JSON.stringify(updatePayload)+" for instance "+ type)
        commitMouseEvents(instance,updatePayload);
    },

    prepareUpdate(instance: any, type: any, oldProps: any, newProps: any) {
        function diff(obj:Record<string, any>,base:Record<string, any>){
           return  _.transform(obj,function(result,value,key){
                if(key == "children")
                    return;
                if(!_.isEqual(value,base[key])){
                    (result as any)[key] = (_.isObject(value) && _.isObject(base[key]) && (!_.isFunction(value)) ? diff(value,base[key]) : value)
                }
            })
        }
        let prePayload = diff(newProps,oldProps);
        console.info("Update payload: "+JSON.stringify(prePayload)+" for instance "+ type)
        return prePayload
    },

    detachDeletedInstance() {

    },

    finalizeInitialChildren(){
        return false;
    },
    supportsMutation: true
};

const ReactReconcilerInstance = ReactReconciler(MinecraftNativeReconcilerConfig as any);

export const MinecraftGui = {
    render(reactElement:any, container:MinecraftNativeGuiModule){
        let root = ReactReconcilerInstance.createContainer(
            container,
            0,
            null,
            false,
            false,
            '',
            ()=>{},
            null);
        return ReactReconcilerInstance.updateContainer(reactElement,root);
    }
}