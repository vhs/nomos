/* eslint-disable @typescript-eslint/max-params */
/* eslint-disable @typescript-eslint/naming-convention */
// This file was generated by generate-provider-implementations.sh on Tue Mar  4 01:44:27 UTC 2025.
// Do not change manually.

import { backendCall } from '@/lib/backend'

import type { BackendResult } from '@/types/api'
import type { IEventService2 } from '@/types/providers/IEventService2'
import type { Event, Events } from '@/types/validators/records'

export default class EventService2 implements IEventService2 {
    /**
     * @permission administrator
     *
     * @param {string} filters
     *
     * @throws {string}
     *
     * @returns {number}
     */
    async CountEvents(filters: string): BackendResult<number> {
        return await backendCall('/services/v2/EventService2.svc/CountEvents', { filters })
    }

    /**
     * @permission administrator
     *
     * @param {string} name
     * @param {string} domain
     * @param {string} event
     * @param {string} description
     * @param {boolean}   enabled
     *
     * @throws {string}
     *
     * @returns {Event}
     */
    async CreateEvent(
        name: string,
        domain: string,
        event: string,
        description: string,
        enabled: boolean
    ): BackendResult<Event> {
        return await backendCall('/services/v2/EventService2.svc/CreateEvent', {
            name,
            domain,
            event,
            description,
            enabled
        })
    }

    /**
     * @permission administrator
     *
     * @param {number} id
     *
     * @throws {string}
     *
     * @returns {void}
     */
    async DeleteEvent(id: number): BackendResult<void> {
        return await backendCall('/services/v2/EventService2.svc/DeleteEvent', { id })
    }

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
    async EnableEvent(id: number, enabled: boolean): BackendResult<boolean> {
        return await backendCall('/services/v2/EventService2.svc/EnableEvent', { id, enabled })
    }

    /**
     * @permission user
     *
     * @throws {string}
     *
     * @returns {Events}
     */
    async GetAccessibleEvents(): BackendResult<Events> {
        return await backendCall('/services/v2/EventService2.svc/GetAccessibleEvents', {})
    }

    /**
     * @permission webhook|administrator
     *
     * @param {string} domain
     *
     * @throws {string}
     *
     * @returns {void}
     */
    async GetDomainDefinition(domain: string): BackendResult<void> {
        return await backendCall('/services/v2/EventService2.svc/GetDomainDefinition', { domain })
    }

    /**
     * @permission webhook|administrator
     *
     * @throws {string}
     *
     * @returns {unknown[]}
     */
    async GetDomainDefinitions(): BackendResult<unknown[]> {
        return await backendCall('/services/v2/EventService2.svc/GetDomainDefinitions', {})
    }

    /**
     * @permission administrator
     *
     * @param {number} id
     *
     * @throws {string}
     *
     * @returns {Event}
     */
    async GetEvent(id: number): BackendResult<Event> {
        return await backendCall('/services/v2/EventService2.svc/GetEvent', { id })
    }

    /**
     * @permission webhook|administrator
     *
     * @throws {string}
     *
     * @returns {Events}
     */
    async GetEvents(): BackendResult<Events> {
        return await backendCall('/services/v2/EventService2.svc/GetEvents', {})
    }

    /**
     * @permission administrator
     *
     * @throws {string}
     *
     * @returns {string[]}
     */
    async GetEventTypes(): BackendResult<string[]> {
        return await backendCall('/services/v2/EventService2.svc/GetEventTypes', {})
    }

    /**
     * @permission webhook|administrator
     *
     * @param {number}    page
     * @param {number}    size
     * @param {string} columns
     * @param {string} order
     * @param {string} filters
     *
     * @throws {string}
     *
     * @returns {Events}
     */
    async ListEvents(
        page: number,
        size: number,
        columns: string,
        order: string,
        filters: string
    ): BackendResult<Events> {
        return await backendCall('/services/v2/EventService2.svc/ListEvents', { page, size, columns, order, filters })
    }

    /**
     * @permission administrator
     *
     * @param {number}             id
     * @param {string|string[]} privileges
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    async PutEventPrivileges(id: number, privileges: string | string[]): BackendResult<boolean> {
        return await backendCall('/services/v2/EventService2.svc/PutEventPrivileges', { id, privileges })
    }

    /**
     * @permission administrator
     *
     * @param {number}    id
     * @param {string} name
     * @param {string} domain
     * @param {string} event
     * @param {string} description
     * @param {boolean}   enabled
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    async UpdateEvent(
        id: number,
        name: string,
        domain: string,
        event: string,
        description: string,
        enabled: boolean
    ): BackendResult<boolean> {
        return await backendCall('/services/v2/EventService2.svc/UpdateEvent', {
            id,
            name,
            domain,
            event,
            description,
            enabled
        })
    }

    private static _instance: EventService2

    public static getInstance(): EventService2 {
        if (EventService2._instance == null) {
            EventService2._instance = new EventService2()
        }

        return EventService2._instance
    }
}
