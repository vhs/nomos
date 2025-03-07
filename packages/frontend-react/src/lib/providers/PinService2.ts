/* eslint-disable @typescript-eslint/naming-convention */
// Do not change manually.

import { backendCall } from '@/lib/backend'

import type { BackendResult } from '@/types/api'
import type { IPinService2 } from '@/types/providers/IPinService2'
import type { Key } from '@/types/validators/records'

export default class PinService2 implements IPinService2 {
    /**
     * @permission door
     *
     * @throws {string}
     *
     * @returns {string}
     */
    async AccessInstructions(): BackendResult<string> {
        return await backendCall('/services/v2/PinService2.svc/AccessInstructions', {})
    }

    /**
     * Automatically generates a pin for a specified user.
     *
     * @permission administrator|user
     *
     * @param {number} userid
     *
     * @throws {string}
     *
     * @returns {Key|null}
     */
    async GeneratePin(userid: number): BackendResult<Key | null> {
        return await backendCall('/services/v2/PinService2.svc/GeneratePin', { userid })
    }

    /**
     * @permission gen-temp-pin|administrator
     *
     * @param {string} expires
     * @param {string} privileges
     * @param {string} notes
     *
     * @throws {string}
     *
     * @returns {Key}
     */
    async GenerateTemporaryPin(expires: string, privileges: string, notes: string): BackendResult<Key> {
        return await backendCall('/services/v2/PinService2.svc/GenerateTemporaryPin', { expires, privileges, notes })
    }

    /**
     * @permission administrator|user
     *
     * @param {number} userid
     *
     * @throws {string}
     *
     * @returns {Key|null}
     */
    async GetUserPin(userid: number): BackendResult<Key | null> {
        return await backendCall('/services/v2/PinService2.svc/GetUserPin', { userid })
    }

    /**
     * @permission administrator|user
     *
     * @param {number} keyid
     * @param {string} pin
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    async UpdatePin(keyid: number, pin: string): BackendResult<boolean> {
        return await backendCall('/services/v2/PinService2.svc/UpdatePin', { keyid, pin })
    }

    /**
     * Change a pin.
     *
     * @permission administrator|user
     *
     * @param {number} userid
     * @param {string} pin
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    async UpdateUserPin(userid: number, pin: string): BackendResult<boolean> {
        return await backendCall('/services/v2/PinService2.svc/UpdateUserPin', { userid, pin })
    }

    private static _instance: PinService2

    public static getInstance(): PinService2 {
        if (PinService2._instance == null) {
            PinService2._instance = new PinService2()
        }

        return PinService2._instance
    }
}
