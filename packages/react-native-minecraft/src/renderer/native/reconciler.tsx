import ReactReconciler, {HostConfig} from "react-reconciler";
import {connectDevtools} from "../../debugger";
import {DomContext, DomNode, GuiContext} from "./native";
import {createContext, ReactNode} from "react";
import * as React from "react";
import {getAttributeUpdatePayload, setInitialAttribute, updateAttribute} from "./attribute";

const MinecraftNativeReconcilerConfig: Partial<HostConfig<
        any,
        Record<string, any>,
        DomContext,
        DomNode,
        DomNode,
        any, any, any, any, any, any, any, any>> = {
    getRootHostContext(rootContainer: DomContext) {},
    prepareForCommit(containerInfo: DomContext) {return null;},
    getChildHostContext(parentHostContext: any) { return parentHostContext; },
    clearContainer(node) {},
    shouldSetTextContent() {return false;},
    resetAfterCommit(containerInfo: DomContext) {},
    createInstance(type: string, props: Record<string, any>, rootContainer: DomContext, hostContext: never, internalHandle: ReactReconciler.OpaqueHandle){
        let element = rootContainer.createNode(type);
        setInitialAttribute(element,props);
        return element;
    },
    createTextInstance(text: any, rootContainer: DomContext, hostContext: any, internalHandle: any) {
        const element = rootContainer.createNode("text");
        element.setAttribute("content",text);
        return element;
    },
    removeChildFromContainer(container: DomContext, child: DomNode) {
        container.getRootNode().removeChild(child);
    },
    appendChildToContainer(container:DomContext, child:DomNode){
        container.getRootNode().addChild(child);
    },

    insertInContainerBefore(container: DomContext, child: DomNode, beforeChild: DomNode) {
        container.getRootNode().addChildBefore(child, beforeChild);
    },

    appendInitialChild(parentInstance: DomNode, child: DomNode) {
        parentInstance.addChild(child);
    },

    removeChild(parentInstance: DomNode, child: DomNode) {
        parentInstance.removeChild(child);
    },

    commitTextUpdate(element: DomNode, oldText: string, newText: string) {
        element.setAttribute("content", newText);
    },

    commitUpdate(instance: DomNode,
                 updatePayload: any,
                 type: any,
                 prevProps: Record<string, any>,
                 nextProps: Record<string, any>,
                 internalHandle: ReactReconciler.OpaqueHandle
    ) {
        updateAttribute(instance,updatePayload);
    },

    prepareUpdate(instance: DomNode, type: any, oldProps: object, newProps: object) {
        return getAttributeUpdatePayload(instance,oldProps,newProps);
    },

    detachDeletedInstance(node: DomNode) {

    },

    finalizeInitialChildren(){
        return false;
    },
    supportsMutation: true,
    appendChild(parentInstance: DomNode, child: DomNode) {
        parentInstance.addChild(child);
    },
    insertBefore(parentInstance: DomNode, child: DomNode, beforeChild: DomNode) {
        parentInstance.addChildBefore(child,beforeChild);
    }
};

export const ReactReconcilerInstance = ReactReconciler(MinecraftNativeReconcilerConfig as any);

connectDevtools(ReactReconcilerInstance);

const GuiContextProvider = createContext<GuiContext | null>(null);

export const MinecraftGui = {
    render(reactElement:ReactNode, container:GuiContext){
        let root = ReactReconcilerInstance.createContainer(
            container,
            0,
            null,
            false,
            false,
            '',
            ()=>{},
            null);
        ReactReconcilerInstance.updateContainer(
            <>
                <GuiContextProvider.Provider value={container}>
                    { reactElement }
                </GuiContextProvider.Provider>
            </>,root);

        return {
            unmount:()=>{
                ReactReconcilerInstance.updateContainer(null,root);
            }
        };

    }
}

export const useGuiContext : ()=>GuiContext = () => (React.useContext(GuiContextProvider)!);

export const useContextEvent : (eventName:string, callback:Function) => void = (eventName, callback)=>{
    const guiContext = useGuiContext();
    React.useEffect(()=>{
        guiContext.addEventListener(eventName,callback);
        return ()=>{
            guiContext.removeEventListener(eventName,callback);
        }
    },[eventName,callback]);
}