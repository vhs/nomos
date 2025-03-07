/* eslint-disable @typescript-eslint/naming-convention */
// Do not change manually.

import type { BackendResult } from '@/types/api'
import type { Key } from '@/types/validators/records'

export interface IPinService2 {
    /**
     * @permission door
     *
     * @throws {string}
     *
     * @returns {string}
     */
    AccessInstructions: () => BackendResult<string>

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
    GeneratePin: (userid: number) => BackendResult<Key | null>

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
    GenerateTemporaryPin: (expires: string, privileges: string, notes: string) => BackendResult<Key>

    /**
     * @permission administrator|user
     *
     * @param {number} userid
     *
     * @throws {string}
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
     * @throws {string}
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
     * @throws {string}
     *
     * @returns {boolean}
     */
    UpdateUserPin: (userid: number, pin: string) => BackendResult<boolean>
}
