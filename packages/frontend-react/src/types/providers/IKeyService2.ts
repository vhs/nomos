/* eslint-disable @typescript-eslint/naming-convention */
// Do not change manually.

import type { BackendResult } from '@/types/api'
import type { Key, Keys } from '@/types/validators/records'

export interface IKeyService2 {
    /**
     * @permission administrator|user
     *
     * @param {number} id
     *
     * @throws {string}
     *
     * @returns {void}
     */
    DeleteKey: (id: number) => BackendResult<void>

    /**
     * @permission administrator|user
     *
     * @param {number} userid
     * @param {string} type
     * @param {string} value
     * @param {string} notes
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
     * @returns {Keys}
     */
    GetAllKeys: () => BackendResult<Keys>

    /**
     * @permission administrator|user
     *
     * @param {number} keyid
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
     * @returns {Keys}
     */
    GetSystemKeys: () => BackendResult<Keys>

    /**
     * @permission administrator|user
     *
     * @param {number}   userid
     * @param {string[]} types
     *
     * @throws {string}
     *
     * @returns {Keys}
     */
    GetUserKeys: (userid: number, types: string[]) => BackendResult<Keys>

    /**
     * @permission administrator|user
     *
     * @param {number}          keyid
     * @param {string|string[]} privileges
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    PutKeyPrivileges: (keyid: number, privileges: string | string[]) => BackendResult<boolean>

    /**
     * @permission administrator|user
     *
     * @param {number} keyid
     * @param {string} notes
     * @param {string} expires
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    UpdateKey: (keyid: number, notes: string, expires: string) => BackendResult<boolean>
}
