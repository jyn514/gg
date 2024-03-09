// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { RefName } from "./RefName";
import type { RevHeader } from "./RevHeader";
import type { TreePath } from "./TreePath";

export type MenuContext = { "type": "Revision", rev: RevHeader, } | { "type": "Tree", rev: RevHeader, path: TreePath, } | { "type": "Branch", rev: RevHeader, name: RefName, };