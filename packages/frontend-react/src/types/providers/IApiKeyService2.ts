/* eslint-disable @typescript-eslint/naming-convention */
// Do not change manually.

import type { BackendResult } from '@/types/api'
import type { Key, Keys } from '@/types/validators/records'

export interface IApiKeyService2 {
    /**
     * @permission administrator|user
     *
     * @param {number} id
     *
     * @throws {string}
     *
     * @returns {void}
     */
    DeleteApiKey: (id: number) => BackendResult<void>

    /**
     * @permission administrator
     *
     * @param {string} notes
     *
     * @throws {string}
     *
     * @returns {Key}
     */
    GenerateSystemApiKey: (notes: string) => BackendResult<Key>

    /**
     * @permission administrator|user
     *
     * @param {number}    userid
     * @param {string} notes
     *
     * @throws {string}
     *
     * @returns {Key}
     */
    GenerateUserApiKey: (userid: number, notes: string) => BackendResult<Key>

    /**
     * @permission administrator|user
     *
     * @param {number} keyid
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
     * @returns {Keys}
     */
    GetSystemApiKeys: () => BackendResult<Keys>

    /**
     * @permission administrator|user
     *
     * @param {number} userid
     *
     * @throws {string}
     *
     * @returns {Keys}
     */
    GetUserApiKeys: (userid: number) => BackendResult<Keys>

    /**
     * @permission administrator|user
     *
     * @param {number}             keyid
     * @param {string|string[]} privileges
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    PutApiKeyPrivileges: (keyid: number, privileges: string | string[]) => BackendResult<boolean>

    /**
     * @permission administrator|user
     *
     * @param {number}         keyid
     * @param {string}      notes
     * @param {string|null} expires
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    UpdateApiKey: (keyid: number, notes: string, expires: string | null) => BackendResult<boolean>
}
