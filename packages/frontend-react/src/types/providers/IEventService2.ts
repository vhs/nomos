/* eslint-disable @typescript-eslint/naming-convention */
// Do not change manually.

import type { Filter } from '@/lib/db/utils/query-filters'

import type { BackendResult } from '@/types/api'
import type { Event, Events } from '@/types/validators/records'

export interface IEventService2 {
    /**
     * @permission administrator
     *
     * @param {Filter|null} filters
     *
     * @returns {number}
     */
    CountEvents: (filters: Filter | null) => BackendResult<number>

    /**
     * @permission administrator
     *
     * @param {string}  name
     * @param {string}  domain
     * @param {string}  event
     * @param {string}  description
     * @param {boolean} enabled
     *
     * @returns {Event}
     */
    CreateEvent: (
        name: string,
        domain: string,
        event: string,
        description: string,
        enabled: boolean
    ) => BackendResult<Event>

    /**
     * @permission administrator
     *
     * @param {number} id
     *
     * @returns {void}
     */
    DeleteEvent: (id: number) => BackendResult<void>

    /**
     * @permission administrator
     *
     * @param {number}  id
     * @param {boolean} enabled
     *
     * @returns {boolean}
     */
    EnableEvent: (id: number, enabled: boolean) => BackendResult<boolean>

    /**
     * @permission user
     *
     * @returns {Events}
     */
    GetAccessibleEvents: () => BackendResult<Events>

    /**
     * @permission webhook|administrator
     *
     * @param {string} domain
     *
     * @returns {void}
     */
    GetDomainDefinition: (domain: string) => BackendResult<void>

    /**
     * @permission webhook|administrator
     *
     * @returns {unknown}
     */
    GetDomainDefinitions: () => BackendResult<unknown>

    /**
     * @permission administrator
     *
     * @param {number} id
     *
     * @returns {Event}
     */
    GetEvent: (id: number) => BackendResult<Event>

    /**
     * @permission webhook|administrator
     *
     * @returns {Events}
     */
    GetEvents: () => BackendResult<Events>

    /**
     * @permission administrator
     *
     * @returns {string[]}
     */
    GetEventTypes: () => BackendResult<string[]>

    /**
     * @permission webhook|administrator
     *
     * @param {number}      page
     * @param {number}      size
     * @param {string}      columns
     * @param {string}      order
     * @param {Filter|null} filters
     *
     * @returns {Events}
     */
    ListEvents: (
        page: number,
        size: number,
        columns: string,
        order: string,
        filters: Filter | null
    ) => BackendResult<Events>

    /**
     * @permission administrator
     *
     * @param {number}          id
     * @param {string|string[]} privileges
     *
     * @returns {boolean}
     */
    PutEventPrivileges: (id: number, privileges: string | string[]) => BackendResult<boolean>

    /**
     * @permission administrator
     *
     * @param {number}  id
     * @param {string}  name
     * @param {string}  domain
     * @param {string}  event
     * @param {string}  description
     * @param {boolean} enabled
     *
     * @returns {boolean}
     */
    UpdateEvent: (
        id: number,
        name: string,
        domain: string,
        event: string,
        description: string,
        enabled: boolean
    ) => BackendResult<boolean>
}
