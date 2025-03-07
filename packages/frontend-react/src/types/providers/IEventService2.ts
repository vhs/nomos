/* eslint-disable @typescript-eslint/max-params */
/* eslint-disable @typescript-eslint/naming-convention */
// Do not change manually.

import type { BackendResult } from '@/types/api'
import type { Event, Events } from '@/types/validators/records'

export interface IEventService2 {
    /**
     * @permission administrator
     *
     * @param {string} filters
     *
     * @throws {string}
     *
     * @returns {number}
     */
    CountEvents: (filters: string) => BackendResult<number>

    /**
     * @permission administrator
     *
     * @param {string}  name
     * @param {string}  domain
     * @param {string}  event
     * @param {string}  description
     * @param {boolean} enabled
     *
     * @throws {string}
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
     * @throws {string}
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
     * @throws {string}
     *
     * @returns {boolean}
     */
    EnableEvent: (id: number, enabled: boolean) => BackendResult<boolean>

    /**
     * @permission user
     *
     * @throws {string}
     *
     * @returns {Events}
     */
    GetAccessibleEvents: () => BackendResult<Events>

    /**
     * @permission webhook|administrator
     *
     * @param {string} domain
     *
     * @throws {string}
     *
     * @returns {void}
     */
    GetDomainDefinition: (domain: string) => BackendResult<void>

    /**
     * @permission webhook|administrator
     *
     * @throws {string}
     *
     * @returns {unknown}
     */
    GetDomainDefinitions: () => BackendResult<unknown>

    /**
     * @permission administrator
     *
     * @param {number} id
     *
     * @throws {string}
     *
     * @returns {Event}
     */
    GetEvent: (id: number) => BackendResult<Event>

    /**
     * @permission webhook|administrator
     *
     * @throws {string}
     *
     * @returns {Events}
     */
    GetEvents: () => BackendResult<Events>

    /**
     * @permission administrator
     *
     * @throws {string}
     *
     * @returns {string[]}
     */
    GetEventTypes: () => BackendResult<string[]>

    /**
     * @permission webhook|administrator
     *
     * @param {number} page
     * @param {number} size
     * @param {string} columns
     * @param {string} order
     * @param {string} filters
     *
     * @throws {string}
     *
     * @returns {Events}
     */
    ListEvents: (page: number, size: number, columns: string, order: string, filters: string) => BackendResult<Events>

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
     * @throws {string}
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
