/* eslint-disable @typescript-eslint/max-params */
/* eslint-disable @typescript-eslint/naming-convention */
// This file was generated by generate-providers-types.sh on Wed Feb  5 22:40:41 UTC 2025.
// Do not change manually.

import type { BackendResult } from '../custom'

export interface IEventService2 {
    /**
     * @permission administrator
     *
     * @param {string} $filters
     *
     * @throws {string}
     *
     * @returns {number}
     */
    CountEvents: (filters: string) => BackendResult<number>

    /**
     * @permission administrator
     *
     * @param {string} $name
     * @param {string} $domain
     * @param {string} $event
     * @param {string} $description
     * @param {boolean}   $enabled
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    CreateEvent: (
        name: string,
        domain: string,
        event: string,
        description: string,
        enabled: boolean
    ) => BackendResult<boolean>

    /**
     * @permission administrator
     *
     * @param {number} $id
     *
     * @throws {string}
     *
     * @returns {void}
     */
    DeleteEvent: (id: number) => BackendResult<void>

    /**
     * @permission administrator
     *
     * @param {number}  $id
     * @param {boolean} $enabled
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
     * @returns {Event[]}
     */
    GetAccessibleEvents: () => BackendResult<Event[]>

    /**
     * @permission webhook|administrator
     *
     * @param {string} $domain
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
     * @returns {unknown[]}
     */
    GetDomainDefinitions: () => BackendResult<unknown[]>

    /**
     * @permission administrator
     *
     * @param {number} $id
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
     * @returns {Event[]}
     */
    GetEvents: () => BackendResult<Event[]>

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
     * @param {number}    $page
     * @param {number}    $size
     * @param {string} $columns
     * @param {string} $order
     * @param {string} $filters
     *
     * @throws {string}
     *
     * @returns {Event[]}
     */
    ListEvents: (page: number, size: number, columns: string, order: string, filters: string) => BackendResult<Event[]>

    /**
     * @permission administrator
     *
     * @param {number}    $id
     * @param {string} $privileges
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    PutEventPrivileges: (id: number, privileges: string) => BackendResult<boolean>

    /**
     * @permission administrator
     *
     * @param {number}    $id
     * @param {string} $name
     * @param {string} $domain
     * @param {string} $event
     * @param {string} $description
     * @param {boolean}   $enabled
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
