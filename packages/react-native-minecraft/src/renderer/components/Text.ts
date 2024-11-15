import React, {ReactElement} from "react";

export default function Text(props: any, container: any):ReactElement {
    if(props.children){
        console.warn("Props.children is not expected in this Node in current version: ", props.children);
        delete props['children'];
    }
    return React.createElement("text",props);
}