/* eslint-disable @typescript-eslint/naming-convention */
// Do not change manually.

import { backendCall } from '@/lib/backend'

import type { BackendResult } from '@/types/api'
import type { IKeyService2 } from '@/types/providers/IKeyService2'
import type { Key, Keys } from '@/types/validators/records'

export default class KeyService2 implements IKeyService2 {
    /**
     * @permission administrator|user
     *
     * @param {number} id
     *
     * @returns {void}
     */
    async DeleteKey(id: number): BackendResult<void> {
        return await backendCall('/services/v2/KeyService2.svc/DeleteKey', { id })
    }

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
    async GenerateUserKey(userid: number, type: string, value: string, notes: string): BackendResult<Key | null> {
        return await backendCall('/services/v2/KeyService2.svc/GenerateUserKey', { userid, type, value, notes })
    }

    /**
     * @permission administrator
     *
     * @returns {Keys}
     */
    async GetAllKeys(): BackendResult<Keys> {
        return await backendCall('/services/v2/KeyService2.svc/GetAllKeys', {})
    }

    /**
     * @permission administrator|user
     *
     * @param {number} keyid
     *
     * @returns {Key}
     */
    async GetKey(keyid: number): BackendResult<Key> {
        return await backendCall('/services/v2/KeyService2.svc/GetKey', { keyid })
    }

    /**
     * @permission administrator
     *
     * @returns {Keys}
     */
    async GetSystemKeys(): BackendResult<Keys> {
        return await backendCall('/services/v2/KeyService2.svc/GetSystemKeys', {})
    }

    /**
     * @permission administrator|user
     *
     * @param {number}   userid
     * @param {string[]} types
     *
     * @returns {Keys}
     */
    async GetUserKeys(userid: number, types: string[]): BackendResult<Keys> {
        return await backendCall('/services/v2/KeyService2.svc/GetUserKeys', { userid, types })
    }

    /**
     * @permission administrator|user
     *
     * @param {number}          keyid
     * @param {string|string[]} privileges
     *
     * @returns {boolean}
     */
    async PutKeyPrivileges(keyid: number, privileges: string | string[]): BackendResult<boolean> {
        return await backendCall('/services/v2/KeyService2.svc/PutKeyPrivileges', { keyid, privileges })
    }

    /**
     * @permission administrator|user
     *
     * @param {number} keyid
     * @param {string} notes
     * @param {string} expires
     *
     * @returns {boolean}
     */
    async UpdateKey(keyid: number, notes: string, expires: string): BackendResult<boolean> {
        return await backendCall('/services/v2/KeyService2.svc/UpdateKey', { keyid, notes, expires })
    }

    private static _instance: KeyService2

    public static getInstance(): KeyService2 {
        if (KeyService2._instance == null) {
            KeyService2._instance = new KeyService2()
        }

        return KeyService2._instance
    }
}
