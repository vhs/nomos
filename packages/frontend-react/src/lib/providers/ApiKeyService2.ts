/* eslint-disable @typescript-eslint/naming-convention */
// Do not change manually.

import { backendCall } from '@/lib/backend'

import type { BackendResult } from '@/types/api'
import type { IApiKeyService2 } from '@/types/providers/IApiKeyService2'
import type { Key, Keys } from '@/types/validators/records'

export default class ApiKeyService2 implements IApiKeyService2 {
    /**
     * @permission administrator|user
     *
     * @param {number} id
     *
     * @throws {string}
     *
     * @returns {void}
     */
    async DeleteApiKey(id: number): BackendResult<void> {
        return await backendCall('/services/v2/ApiKeyService2.svc/DeleteApiKey', { id })
    }

    /**
     * @permission administrator
     *
     * @param {string} notes
     *
     * @throws {string}
     *
     * @returns {Key}
     */
    async GenerateSystemApiKey(notes: string): BackendResult<Key> {
        return await backendCall('/services/v2/ApiKeyService2.svc/GenerateSystemApiKey', { notes })
    }

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
    async GenerateUserApiKey(userid: number, notes: string): BackendResult<Key> {
        return await backendCall('/services/v2/ApiKeyService2.svc/GenerateUserApiKey', { userid, notes })
    }

    /**
     * @permission administrator|user
     *
     * @param {number} keyid
     *
     * @throws {string}
     *
     * @returns {Key}
     */
    async GetApiKey(keyid: number): BackendResult<Key> {
        return await backendCall('/services/v2/ApiKeyService2.svc/GetApiKey', { keyid })
    }

    /**
     * @permission administrator
     *
     * @throws {string}
     *
     * @returns {Keys}
     */
    async GetSystemApiKeys(): BackendResult<Keys> {
        return await backendCall('/services/v2/ApiKeyService2.svc/GetSystemApiKeys', {})
    }

    /**
     * @permission administrator|user
     *
     * @param {number} userid
     *
     * @throws {string}
     *
     * @returns {Keys}
     */
    async GetUserApiKeys(userid: number): BackendResult<Keys> {
        return await backendCall('/services/v2/ApiKeyService2.svc/GetUserApiKeys', { userid })
    }

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
    async PutApiKeyPrivileges(keyid: number, privileges: string | string[]): BackendResult<boolean> {
        return await backendCall('/services/v2/ApiKeyService2.svc/PutApiKeyPrivileges', { keyid, privileges })
    }

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
    async UpdateApiKey(keyid: number, notes: string, expires: string | null): BackendResult<boolean> {
        return await backendCall('/services/v2/ApiKeyService2.svc/UpdateApiKey', { keyid, notes, expires })
    }

    private static _instance: ApiKeyService2

    public static getInstance(): ApiKeyService2 {
        if (ApiKeyService2._instance == null) {
            ApiKeyService2._instance = new ApiKeyService2()
        }

        return ApiKeyService2._instance
    }
}
