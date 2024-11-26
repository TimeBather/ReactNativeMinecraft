export interface DomNode{
    addChildAt(index: number, child: DomNode);
    addChild(child: DomNode)
    removeChild(child: DomNode)
    addEventListener(eventName: string, callback: Function);
    removeEventListener(eventName: string, callback: Function)
    dispatchEvent(eventName: string, event: any);
    getAttribute(name:string):string;
    setAttribute(name:string,value:string);

    close(): void;

    hasFeature(featureName: string): boolean

    addChildBefore(child: DomNode, beforeChild: DomNode): boolean;
}

export interface GuiDomNode extends DomNode{}

export interface GuiDomText extends DomNode{}

export interface DomContext<N extends DomNode = DomNode ,R extends N = DomNode>{
    getRootNode():R;
    createNode(name:string):N;
    createTextNode(name:string, content:string):N;
    addEventListener(eventName: string, callback: Function): void;
    removeEventListener(eventName: string, callback: Function): void;
}

export interface GuiContext extends DomContext<GuiDomNode, GuiDomNode>{
    getContextModuleNative<T>(name:string):T;
}

export interface StyleSheet{
    setStyle(name:string, value:string);
    removeStyle(name:string);
}

export interface StyleSheetNode{
    styles:StyleSheet
}