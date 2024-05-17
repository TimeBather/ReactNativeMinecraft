/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { ComponentType, Node } from 'react';

import AppContainer from './AppContainer';
import invariant from 'fbjs/lib/invariant';
import React from 'react';
import {MinecraftGui} from "react-native-minecraft";

console.info("AppContainer",AppContainer);
export type Application = {
    unmount: () => void
};

export default function renderApplication<Props: Object>(
    RootComponent: ComponentType<Props>,
    WrapperComponent?: ?ComponentType<*>,
    callback?: () => void,
    options: {
        initialProps: Props
    }
): Application {
    const { initialProps } = options;

    return MinecraftGui.render(
        <AppContainer
            WrapperComponent={WrapperComponent}
            ref={callback}
        >
            <RootComponent {...initialProps} />
        </AppContainer>,
        minecraft.getGuiContainer()
    );
}

export function getApplication(
    RootComponent: ComponentType<Object>,
    initialProps: Object,
    WrapperComponent?: ?ComponentType<*>
): {| element: Node |} {
    console.info("AppContainer",AppContainer);
    const element = (
        <AppContainer WrapperComponent={WrapperComponent} rootTag={{}}>
            <RootComponent {...initialProps} />
        </AppContainer>
    );
    // Don't escape CSS text
    const getStyleElement = (props) => {};
    return { element };
}