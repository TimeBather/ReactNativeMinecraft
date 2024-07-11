/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 * @format
 */

'use strict';

export type PackagerAsset = {
    +__packager_asset: boolean,
    +fileSystemLocation: string,
    +httpServerLocation: string,
    +width: ?number,
    +height: ?number,
    +scales: Array<number>,
    +hash: string,
    +name: string,
    +type: string,
    ...
};

const assets: Array<PackagerAsset> = [];

const typeMap = {
    "png":"texture",
    "jpg":"texture"
}

function registerAsset(asset: PackagerAsset): string {
    return `assets(${globalThis['__METRO_BOOTSTRAP_MODULE'].asset(asset.httpServerLocation + "/" + asset.name + "." + asset.type, typeMap[asset.type])})`;
}

module.exports = {registerAsset};