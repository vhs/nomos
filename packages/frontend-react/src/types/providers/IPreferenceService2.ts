/* eslint-disable @typescript-eslint/max-params */
/* eslint-disable @typescript-eslint/naming-convention */
// This file was generated by generate-providers-types.sh on Wed Feb  5 22:40:42 UTC 2025.
// Do not change manually.

import type { BackendResult } from '../custom'
import type { SystemPreference } from '../records'

export interface IPreferenceService2 {
    /**
     * @permission administrator
     *
     * @param {string} $filters
     *
     * @throws {string}
     *
     * @returns {number}
     */
    CountSystemPreferences: (filters: string) => BackendResult<number>

    /**
     * @permission administrator
     *
     * @param {string} $key
     *
     * @throws {string}
     *
     * @returns {void}
     */
    DeleteSystemPreference: (key: string) => BackendResult<void>

    /**
     * @permission administrator
     *
     * @throws {string}
     *
     * @returns {SystemPreference[]}
     */
    GetAllSystemPreferences: () => BackendResult<SystemPreference[]>

    /**
     * @permission administrator
     *
     * @param {string} $id
     *
     * @throws {string}
     *
     * @returns {SystemPreference}
     */
    GetSystemPreference: (id: string) => BackendResult<SystemPreference>

    /**
     * @permission administrator
     *
     * @param {number}    $page
     * @param {number}    $size
     * @param {string} $columns
     * @param {string} $order
     * @param {string} $filters
     *
     * @throws {string}
     *
     * @returns {SystemPreference[]}
     */
    ListSystemPreferences: (
        page: number,
        size: number,
        columns: string,
        order: string,
        filters: string
    ) => BackendResult<SystemPreference[]>

    /**
     * @permission administrator
     *
     * @param {string} $key
     * @param {string} $value
     * @param {boolean}   $enabled
     * @param {string} $notes
     *
     * @throws {string}
     *
     * @returns {SystemPreference}
     */
    PutSystemPreference: (
        key: string,
        value: string,
        enabled: boolean,
        notes: string
    ) => BackendResult<SystemPreference>

    /**
     * @permission administrator
     *
     * @param {number}    $id
     * @param {string|string[]} $privileges
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    PutSystemPreferencePrivileges: (id: number, privileges: string | string[]) => BackendResult<boolean>

    /**
     * @permission anonymous
     *
     * @param {string} $key
     *
     * @throws {string}
     *
     * @returns {SystemPreference|null}
     */
    SystemPreference: (key: string) => BackendResult<SystemPreference | null>

    /**
     * @permission administrator
     *
     * @param {number}    $id
     * @param {string} $key
     * @param {string} $value
     * @param {boolean}   $enabled
     * @param {string} $notes
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    UpdateSystemPreference: (
        id: number,
        key: string,
        value: string,
        enabled: boolean,
        notes: string
    ) => BackendResult<boolean>

    /**
     * @permission administrator
     *
     * @param {string} $key
     * @param {boolean}   $enabled
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    UpdateSystemPreferenceEnabled: (key: string, enabled: boolean) => BackendResult<boolean>
}
