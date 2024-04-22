import ReactReconciler, {HostConfig} from "react-reconciler";
import {MinecraftNative, MinecraftNativeElement, MinecraftNativeGuiModule} from "./native";

let currentContainer;

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
        return rootContainer.createElement(type, JSON.stringify(props));
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

    },

    prepareUpdate(instance: any, type: any, oldProps: any, newProps: any) {
        return newProps
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