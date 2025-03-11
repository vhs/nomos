/* eslint-disable @typescript-eslint/naming-convention */
// Do not change manually.

import type { Filter } from '@/lib/db/utils/query-filters'

import type { BackendResult } from '@/types/api'
import type { SystemPreference, SystemPreferences } from '@/types/validators/records'

export interface IPreferenceService2 {
    /**
     * @permission administrator
     *
     * @param {Filter|null} filters
     *
     * @throws {string}
     *
     * @returns {number}
     */
    CountSystemPreferences: (filters: Filter | null) => BackendResult<number>

    /**
     * @permission administrator
     *
     * @param {string} key
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
     * @returns {SystemPreferences}
     */
    GetAllSystemPreferences: () => BackendResult<SystemPreferences>

    /**
     * @permission administrator
     *
     * @param {number} id
     *
     * @throws {string}
     *
     * @returns {SystemPreference}
     */
    GetSystemPreference: (id: number) => BackendResult<SystemPreference>

    /**
     * @permission administrator
     *
     * @param {number}      page
     * @param {number}      size
     * @param {string}      columns
     * @param {string}      order
     * @param {Filter|null} filters
     *
     * @throws {string}
     *
     * @returns {SystemPreferences}
     */
    ListSystemPreferences: (
        page: number,
        size: number,
        columns: string,
        order: string,
        filters: Filter | null
    ) => BackendResult<SystemPreferences>

    /**
     * @permission administrator
     *
     * @param {string}  key
     * @param {string}  value
     * @param {boolean} enabled
     * @param {string}  notes
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
     * @param {number}          id
     * @param {string|string[]} privileges
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    PutSystemPreferencePrivileges: (id: number, privileges: string | string[]) => BackendResult<boolean>

    /**
     * @permission anonymous
     *
     * @param {string} key
     *
     * @throws {string}
     *
     * @returns {SystemPreference|null}
     */
    SystemPreference: (key: string) => BackendResult<SystemPreference | null>

    /**
     * @permission administrator
     *
     * @param {number}  id
     * @param {string}  key
     * @param {string}  value
     * @param {boolean} enabled
     * @param {string}  notes
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
     * @param {string}  key
     * @param {boolean} enabled
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    UpdateSystemPreferenceEnabled: (key: string, enabled: boolean) => BackendResult<boolean>
}
