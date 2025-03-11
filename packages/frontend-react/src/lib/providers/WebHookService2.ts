/* eslint-disable @typescript-eslint/naming-convention */
// Do not change manually.

import { backendCall } from '@/lib/backend'
import type { Filter } from '@/lib/db/utils/query-filters'

import type { BackendResult } from '@/types/api'
import type { IWebHookService2 } from '@/types/providers/IWebHookService2'
import type { WebHook, WebHooks } from '@/types/validators/records'

export default class WebHookService2 implements IWebHookService2 {
    /**
     * @permission administrator|webhook
     *
     * @param {Filter|null} filters
     *
     * @throws {string}
     *
     * @returns {number}
     */
    async CountHooks(filters: Filter | null): BackendResult<number> {
        return await backendCall('/services/v2/WebHookService2.svc/CountHooks', { filters })
    }

    /**
     * @permission administrator|user
     *
     * @param {number}      userid
     * @param {Filter|null} filters
     *
     * @throws {string}
     *
     * @returns {number}
     */
    async CountUserHooks(userid: number, filters: Filter | null): BackendResult<number> {
        return await backendCall('/services/v2/WebHookService2.svc/CountUserHooks', { userid, filters })
    }

    /**
     * @permission user
     *
     * @param {string}  name
     * @param {string}  description
     * @param {boolean} enabled
     * @param {string}  url
     * @param {string}  translation
     * @param {string}  headers
     * @param {string}  method
     * @param {number}  eventid
     *
     * @throws {string}
     * @throws {UnauthorizedException}
     *
     * @returns {WebHook}
     */
    async CreateHook(
        name: string,
        description: string,
        enabled: boolean,
        url: string,
        translation: string,
        headers: string,
        method: string,
        eventid: number
    ): BackendResult<WebHook> {
        return await backendCall('/services/v2/WebHookService2.svc/CreateHook', {
            name,
            description,
            enabled,
            url,
            translation,
            headers,
            method,
            eventid
        })
    }

    /**
     * @permission administrator|user
     *
     * @param {number} id
     *
     * @throws {string}
     *
     * @returns {void}
     */
    async DeleteHook(id: number): BackendResult<void> {
        return await backendCall('/services/v2/WebHookService2.svc/DeleteHook', { id })
    }

    /**
     * @permission administrator|user
     *
     * @param {number}  id
     * @param {boolean} enabled
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    async EnableHook(id: number, enabled: boolean): BackendResult<boolean> {
        return await backendCall('/services/v2/WebHookService2.svc/EnableHook', { id, enabled })
    }

    /**
     * @permission webhook|administrator
     *
     * @throws {string}
     *
     * @returns {WebHooks}
     */
    async GetAllHooks(): BackendResult<WebHooks> {
        return await backendCall('/services/v2/WebHookService2.svc/GetAllHooks', {})
    }

    /**
     * @permission user|administrator
     *
     * @param {number} id
     *
     * @throws {string}
     *
     * @returns {WebHook|null}
     */
    async GetHook(id: number): BackendResult<WebHook | null> {
        return await backendCall('/services/v2/WebHookService2.svc/GetHook', { id })
    }

    /**
     * @permission webhook|administrator
     *
     * @param {string} domain
     * @param {string} event
     *
     * @throws {string}
     *
     * @returns {WebHooks}
     */
    async GetHooks(domain: string, event: string): BackendResult<WebHooks> {
        return await backendCall('/services/v2/WebHookService2.svc/GetHooks', { domain, event })
    }

    /**
     * @permission administrator|webhook
     *
     * @param {number}      page
     * @param {number}      size
     * @param {string}      columns
     * @param {string}      order
     * @param {Filter|null} filters
     *
     * @throws {string}
     *
     * @returns {WebHooks}
     */
    async ListHooks(
        page: number,
        size: number,
        columns: string,
        order: string,
        filters: Filter | null
    ): BackendResult<WebHooks> {
        return await backendCall('/services/v2/WebHookService2.svc/ListHooks', { page, size, columns, order, filters })
    }

    /**
     * @permission administrator|user
     *
     * @param {number}      userid
     * @param {number}      page
     * @param {number}      size
     * @param {string}      columns
     * @param {string}      order
     * @param {Filter|null} filters
     *
     * @throws {string}
     * @throws {Exception}
     *
     * @returns {WebHooks}
     */
    async ListUserHooks(
        userid: number,
        page: number,
        size: number,
        columns: string,
        order: string,
        filters: Filter | null
    ): BackendResult<WebHooks> {
        return await backendCall('/services/v2/WebHookService2.svc/ListUserHooks', {
            userid,
            page,
            size,
            columns,
            order,
            filters
        })
    }

    /**
     * @permission administrator|user
     *
     * @param {number}          id
     * @param {string|string[]} privileges
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    async PutHookPrivileges(id: number, privileges: string | string[]): BackendResult<boolean> {
        return await backendCall('/services/v2/WebHookService2.svc/PutHookPrivileges', { id, privileges })
    }

    /**
     * @permission administrator|user
     *
     * @param {number}  id
     * @param {string}  name
     * @param {string}  description
     * @param {boolean} enabled
     * @param {string}  url
     * @param {string}  translation
     * @param {string}  headers
     * @param {string}  method
     * @param {number}  eventid
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    async UpdateHook(
        id: number,
        name: string,
        description: string,
        enabled: boolean,
        url: string,
        translation: string,
        headers: string,
        method: string,
        eventid: number
    ): BackendResult<boolean> {
        return await backendCall('/services/v2/WebHookService2.svc/UpdateHook', {
            id,
            name,
            description,
            enabled,
            url,
            translation,
            headers,
            method,
            eventid
        })
    }

    private static _instance: WebHookService2

    public static getInstance(): WebHookService2 {
        if (WebHookService2._instance == null) {
            WebHookService2._instance = new WebHookService2()
        }

        return WebHookService2._instance
    }
}
