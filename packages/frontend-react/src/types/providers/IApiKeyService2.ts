/* eslint-disable @typescript-eslint/naming-convention */
// This file was generated by generate-providers-types.sh on Wed Feb  5 22:40:41 UTC 2025.
// Do not change manually.

import type { BackendResult } from '@/types/custom'
import type { Key } from '@/types/records'

export interface IApiKeyService2 {
    /**
     * @permission administrator|user
     *
     * @param {number} $keyid
     *
     * @throws {string}
     *
     * @returns {void}
     */
    DeleteApiKey: (keyid: number) => BackendResult<void>

    /**
     * @permission administrator
     *
     * @param {string} $notes
     *
     * @throws {string}
     *
     * @returns {Key}
     */
    GenerateSystemApiKey: (notes: string) => BackendResult<Key>

    /**
     * @permission administrator|user
     *
     * @param {number} $userid
     * @param {string} $notes
     *
     * @throws {string}
     *
     * @returns {Key}
     */
    GenerateUserApiKey: (userid: number, notes: string) => BackendResult<Key>

    /**
     * @permission administrator|user
     *
     * @param {number} $keyid
     *
     * @throws {string}
     *
     * @returns {Key}
     */
    GetApiKey: (keyid: number) => BackendResult<Key>

    /**
     * @permission administrator
     *
     * @throws {string}
     *
     * @returns {Key[]}
     */
    GetSystemApiKeys: () => BackendResult<Key[]>

    /**
     * @permission administrator|user
     *
     * @param {number} $userid
     *
     * @throws {string}
     *
     * @returns {Key[]}
     */
    GetUserApiKeys: (userid: number) => BackendResult<Key[]>

    /**
     * @permission administrator|user
     *
     * @param {number} $keyid
     * @param {string|string[]} $privileges
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    PutApiKeyPrivileges: (keyid: number, privileges: string | string[]) => BackendResult<boolean>

    /**
     * @permission administrator|user
     *
     * @param {number} $keyid
     * @param {string} $notes
     * @param {string} $expires
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    UpdateApiKey: (keyid: number, notes: string, expires: string) => BackendResult<boolean>
}
