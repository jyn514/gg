// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.

export type RefName = { "type": "LocalBranch", branch_name: string, has_conflict: boolean, is_synced: boolean, is_tracking: boolean, } | { "type": "RemoteBranch", branch_name: string, has_conflict: boolean, is_synced: boolean, is_tracked: boolean, is_deleted: boolean, remote_name: string, };