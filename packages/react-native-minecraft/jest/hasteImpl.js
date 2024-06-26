/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

"use strict";
console.info("Hasted")
const path = require("path");

const ROOTS = [
    path.join(__dirname, "..", "node_modules/react-native") + path.sep,
    path.join(__dirname, "..") + path.sep
];

const BLACKLISTED_PATTERNS /*: Array<RegExp>*/ = [
    /.*[\\\/]__(mocks|tests)__[\\\/].*/,
    /^Libraries[\\\/]Animated[\\\/]src[\\\/]polyfills[\\\/].*/,
    /^Libraries[\\\/]Renderer[\\\/]fb[\\\/].*/
];

const WHITELISTED_PREFIXES /*: Array<string>*/ = [
    "IntegrationTests",
    "Libraries",
    "ReactAndroid",
    "RNTester",
    "ReactDom"
];

const NAME_REDUCERS /*: Array<[RegExp, string]>*/ = [
    // extract basename
    [/^(?:.*[\\\/])?([a-zA-Z0-9$_.-]+)$/, "$1"],
    // strip .js/.js.flow suffix
    [/^(.*)\.js(\.flow)?$/, "$1"],
    // strip platform suffix
    [/^(.*)\.(android|ios|native|dom)$/, "$1"]
];

const haste = {
    /*
     * @return {string|void} hasteName for module at filePath; or undefined if
     *                       filePath is not a haste module
     */
    getHasteName(
        filePath /*: string */,
        sourceCode /*: ?string */
    ) /*: string | void */ {
        if (!isHastePath(filePath)) {
            return undefined;
        }

        const hasteName = NAME_REDUCERS.reduce(
            (name, [pattern, replacement]) => name.replace(pattern, replacement),
            filePath
        );

        return hasteName;
    }
};

function isHastePath(filePath /*: string */) /*: boolean */ {
    if (!filePath.endsWith(".js") && !filePath.endsWith(".js.flow")) {
        return false;
    }

    const root = ROOTS.find((r) => filePath.startsWith(r));
    if (!root) {
        return false;
    }

    filePath = filePath.substr(root.length);
    console.log(filePath);
    if (BLACKLISTED_PATTERNS.some((pattern) => pattern.test(filePath))) {
        return false;
    }
    return WHITELISTED_PREFIXES.some((prefix) => filePath.startsWith(prefix));
}

module.exports = haste;