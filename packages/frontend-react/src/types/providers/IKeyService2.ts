/* eslint-disable @typescript-eslint/naming-convention */
// This file was generated by generate-providers-types.sh on Wed Feb  5 22:40:41 UTC 2025.
// Do not change manually.

import type { BackendResult } from '../custom'
import type { Key } from '../records'

export interface IKeyService2 {
    /**
     * @permission administrator|user
     *
     * @param {number} $keyid
     *
     * @throws {string}
     *
     * @returns {void}
     */
    DeleteKey: (keyid: number) => BackendResult<void>

    /**
     * @permission administrator|user
     *
     * @param {number}    $userid
     * @param {string} $type
     * @param {string} $value
     * @param {string} $notes
     *
     * @throws {string}
     *
     * @returns {Key|null}
     */
    GenerateUserKey: (userid: number, type: string, value: string, notes: string) => BackendResult<Key | null>

    /**
     * @permission administrator
     *
     * @throws {string}
     *
     * @returns {Key[]}
     */
    GetAllKeys: () => BackendResult<Key[]>

    /**
     * @permission administrator|user
     *
     * @param {number} $keyid
     *
     * @throws {string}
     *
     * @returns {Key}
     */
    GetKey: (keyid: number) => BackendResult<Key>

    /**
     * @permission administrator
     *
     * @throws {string}
     *
     * @returns {Key[]}
     */
    GetSystemKeys: () => BackendResult<Key[]>

    /**
     * @permission administrator|user
     *
     * @param {number}      $userid
     * @param {string[]} $types
     *
     * @throws {string}
     *
     * @returns {Key[]}
     */
    GetUserKeys: (userid: number, types: string[]) => BackendResult<Key[]>

    /**
     * @permission administrator|user
     *
     * @param {number}    $keyid
     * @param {string | string[]} $privileges
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    PutKeyPrivileges: (keyid: number, privileges: string | string[]) => BackendResult<boolean>

    /**
     * @permission administrator|user
     *
     * @param {number}    $keyid
     * @param {string} $notes
     * @param {string} $expires
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    UpdateKey: (keyid: number, notes: string, expires: string) => BackendResult<boolean>
}
