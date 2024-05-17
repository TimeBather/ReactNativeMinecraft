
/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import * as React from 'react';
import {View} from "react-native-minecraft";

type Props = {
    WrapperComponent?: ?React.ComponentType<*>,
    // $FlowFixMe
    children?: React.Children,
    rootTag: any
};

const RootTagContext: React.Context<any> = React.createContext(null);

const AppContainer: React.AbstractComponent<Props> = React.forwardRef(
    (props: Props, forwardedRef?: React.Ref<any>) => {
        const { children, WrapperComponent } = props;
        console.info("Children",children);
        console.info("RootTagContext",RootTagContext);
        console.info("ForwardedRef",forwardedRef);

        let innerView = (
            <View children={children} key={1} style={{width:'100%',height:'100%'}}/>
        );

        if (WrapperComponent) {
            innerView = <WrapperComponent>{innerView}</WrapperComponent>;
        }

        return (
            <RootTagContext.Provider value={"RootTag"}>
                <View ref={forwardedRef} style={{width:'100%',height:'100%'}}>
                    {innerView}
                </View>
            </RootTagContext.Provider>
        );
    }
);

AppContainer.displayName = 'AppContainer';

export default AppContainer;
