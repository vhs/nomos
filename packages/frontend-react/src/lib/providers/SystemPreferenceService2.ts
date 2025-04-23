/* eslint-disable @typescript-eslint/naming-convention */
// Do not change manually.

import { backendCall } from '@/lib/backend'
import type { Filter } from '@/lib/db/utils/query-filters'

import type { BackendResult } from '@/types/api'
import type { ISystemPreferenceService2 } from '@/types/providers/ISystemPreferenceService2'
import type { SystemPreference, SystemPreferences } from '@/types/validators/records'

export default class SystemPreferenceService2 implements ISystemPreferenceService2 {
    /**
     * @permission administrator
     *
     * @param {Filter|null} filters
     *
     * @returns {number}
     */
    async CountSystemPreferences(filters: Filter | null): BackendResult<number> {
        return await backendCall('/services/v2/SystemPreferenceService2.svc/CountSystemPreferences', { filters })
    }

    /**
     * @permission administrator
     *
     * @param {string|string[]} keys
     *
     * @returns {void}
     */
    async DeleteSystemPreference(keys: string | string[]): BackendResult<void> {
        return await backendCall('/services/v2/SystemPreferenceService2.svc/DeleteSystemPreference', { keys })
    }

    /**
     * @permission administrator
     *
     * @returns {SystemPreferences}
     */
    async GetAllSystemPreferences(): BackendResult<SystemPreferences> {
        return await backendCall('/services/v2/SystemPreferenceService2.svc/GetAllSystemPreferences', {})
    }

    /**
     * @permission administrator
     *
     * @param {number} id
     *
     * @returns {SystemPreference}
     */
    async GetSystemPreference(id: number): BackendResult<SystemPreference> {
        return await backendCall('/services/v2/SystemPreferenceService2.svc/GetSystemPreference', { id })
    }

    /**
     * @permission administrator
     *
     * @param {number}      page
     * @param {number}      size
     * @param {string}      columns
     * @param {string}      order
     * @param {Filter|null} filters
     *
     * @returns {SystemPreferences}
     */
    async ListSystemPreferences(
        page: number,
        size: number,
        columns: string,
        order: string,
        filters: Filter | null
    ): BackendResult<SystemPreferences> {
        return await backendCall('/services/v2/SystemPreferenceService2.svc/ListSystemPreferences', {
            page,
            size,
            columns,
            order,
            filters
        })
    }

    /**
     * @permission administrator
     *
     * @param {string}  key
     * @param {string}  value
     * @param {boolean} enabled
     * @param {string}  notes
     *
     * @returns {SystemPreference}
     */
    async PutSystemPreference(
        key: string,
        value: string,
        enabled: boolean,
        notes: string
    ): BackendResult<SystemPreference> {
        return await backendCall('/services/v2/SystemPreferenceService2.svc/PutSystemPreference', {
            key,
            value,
            enabled,
            notes
        })
    }

    /**
     * @permission administrator
     *
     * @param {number}          id
     * @param {string|string[]} privileges
     *
     * @returns {boolean}
     */
    async PutSystemPreferencePrivileges(id: number, privileges: string | string[]): BackendResult<boolean> {
        return await backendCall('/services/v2/SystemPreferenceService2.svc/PutSystemPreferencePrivileges', {
            id,
            privileges
        })
    }

    /**
     * @permission anonymous
     *
     * @param {string} key
     *
     * @throws {HttpException}
     *
     * @returns {SystemPreference}
     */
    async SystemPreference(key: string): BackendResult<SystemPreference> {
        return await backendCall('/services/v2/SystemPreferenceService2.svc/SystemPreference', { key })
    }

    /**
     * @permission administrator
     *
     * @param {number}  id
     * @param {string}  key
     * @param {string}  value
     * @param {boolean} enabled
     * @param {string}  notes
     *
     * @returns {boolean}
     */
    async UpdateSystemPreference(
        id: number,
        key: string,
        value: string,
        enabled: boolean,
        notes: string
    ): BackendResult<boolean> {
        return await backendCall('/services/v2/SystemPreferenceService2.svc/UpdateSystemPreference', {
            id,
            key,
            value,
            enabled,
            notes
        })
    }

    /**
     * @permission administrator
     *
     * @param {string}  key
     * @param {boolean} enabled
     *
     * @returns {boolean}
     */
    async UpdateSystemPreferenceEnabled(key: string, enabled: boolean): BackendResult<boolean> {
        return await backendCall('/services/v2/SystemPreferenceService2.svc/UpdateSystemPreferenceEnabled', {
            key,
            enabled
        })
    }

    private static _instance: SystemPreferenceService2

    public static getInstance(): SystemPreferenceService2 {
        if (SystemPreferenceService2._instance == null) {
            SystemPreferenceService2._instance = new SystemPreferenceService2()
        }

        return SystemPreferenceService2._instance
    }
}
