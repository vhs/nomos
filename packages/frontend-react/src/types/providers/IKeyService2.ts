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
     * @returns {Key|null}
     */
    GenerateUserKey: (userid: number, type: string, value: string, notes: string) => BackendResult<Key | null>

    /**
     * @permission administrator
     *
     * @returns {Keys}
     */
    GetAllKeys: () => BackendResult<Keys>

    /**
     * @permission administrator|user
     *
     * @param {number} keyid
     *
     * @returns {Key}
     */
    GetKey: (keyid: number) => BackendResult<Key>

    /**
     * @permission administrator
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
     * @returns {Keys}
     */
    GetUserKeys: (userid: number, types: string[]) => BackendResult<Keys>

    /**
     * @permission administrator|user
     *
     * @param {number}          keyid
     * @param {string|string[]} privileges
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
     * @returns {boolean}
     */
    UpdateKey: (keyid: number, notes: string, expires: string) => BackendResult<boolean>
}
