/* eslint-disable @typescript-eslint/naming-convention */
// Do not change manually.

import type { BackendResult } from '@/types/api'
import type { Key } from '@/types/validators/records'

export interface IPinService2 {
    /**
     * @permission door
     *
     * @returns {void}
     */
    AccessInstructions: () => BackendResult<void>

    /**
     * Automatically generates a pin for a specified user.
     *
     * @permission administrator|user
     *
     * @param {number} userid
     *
     * @returns {Key|null}
     */
    GeneratePin: (userid: number) => BackendResult<Key | null>

    /**
     * @permission gen-temp-pin|administrator
     *
     * @param {string} expires
     * @param {string} privileges
     * @param {string} notes
     *
     * @returns {Key}
     */
    GenerateTemporaryPin: (expires: string, privileges: string, notes: string) => BackendResult<Key>

    /**
     * @permission administrator|user
     *
     * @param {number} userid
     *
     * @returns {Key|null}
     */
    GetUserPin: (userid: number) => BackendResult<Key | null>

    /**
     * @permission administrator|user
     *
     * @param {number} keyid
     * @param {string} pin
     *
     * @returns {boolean}
     */
    UpdatePin: (keyid: number, pin: string) => BackendResult<boolean>

    /**
     * Change a pin.
     *
     * @permission administrator|user
     *
     * @param {number} userid
     * @param {string} pin
     *
     * @returns {boolean}
     */
    UpdateUserPin: (userid: number, pin: string) => BackendResult<boolean>
}
