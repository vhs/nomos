/* eslint-disable @typescript-eslint/naming-convention */

import { backendCall } from '@/lib/backend'

import type { BackendResult } from '@/types/custom'
import type { IApiKeyService2 } from '@/types/providers/IApiKeyService2'
import type { Key } from '@/types/records'

export default class ApiKeyService2 implements IApiKeyService2 {
    /**
     * @permission administrator|user
     *
     * @param {number} $keyid
     *
     * @throws {string}
     *
     * @returns {void}
     */
    public async DeleteApiKey(keyid: number): BackendResult<void> {
        return await backendCall('/services/v2/ApiKeyService2.svc/DeleteApiKey', { keyid })
    }

    /**
     * @permission administrator
     *
     * @param {string} $notes
     *
     * @throws {string}
     *
     * @returns {Key}
     */
    public async GenerateSystemApiKey(notes: string): BackendResult<Key> {
        return await backendCall('/services/v2/ApiKeyService2.svc/GenerateSystemApiKey', {
            notes
        })
    }

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
    public async GenerateUserApiKey(userid: number, notes: string): BackendResult<Key> {
        return await backendCall<Key>('/services/v2/ApiKeyService2.svc/GenerateUserApiKey', {
            userid,
            notes
        })
    }

    /**
     * @permission administrator|user
     *
     * @param {number} $keyid
     *
     * @throws {string}
     *
     * @returns {Key}
     */
    public async GetApiKey(keyid: number): BackendResult<Key> {
        return await backendCall<Key>(`/services/v2/ApiKeyService2.svc/GetApiKey?keyid=${keyid}`)
    }

    /**
     * @permission administrator
     *
     * @throws {string}
     *
     * @returns {Key[]}
     */
    public async GetSystemApiKeys(): BackendResult<Key[]> {
        return await backendCall('/services/v2/ApiKeyService2.svc/GetSystemApiKeys')
    }

    /**
     * @permission administrator|user
     *
     * @param {number} $userid
     *
     * @throws {string}
     *
     * @returns {Key[]}
     */
    public async GetUserApiKeys(userid: number): BackendResult<Key[]> {
        return await backendCall('/services/v2/ApiKeyService2.svc/GetUserApiKey[]', { userid })
    }

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
    public async PutApiKeyPrivileges(keyid: number, privileges: string | string[]): BackendResult<boolean> {
        return await backendCall('/services/v2/ApiKeyService2.svc/PutApiKeyPrivileges', {
            keyid,
            privileges
        })
    }

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
    public async UpdateApiKey(keyid: number, notes: string, expires: string): BackendResult<boolean> {
        return await backendCall('/services/v2/ApiKeyService2.svc/UpdateApiKey', {
            keyid,
            notes,
            expires
        })
    }

    private static _instance: ApiKeyService2

    public static getInstance(): ApiKeyService2 {
        if (ApiKeyService2._instance == null) {
            ApiKeyService2._instance = new ApiKeyService2()
        }

        return ApiKeyService2._instance
    }
}
