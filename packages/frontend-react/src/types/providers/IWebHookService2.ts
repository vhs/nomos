/* eslint-disable @typescript-eslint/max-params */
/* eslint-disable @typescript-eslint/naming-convention */
// Do not change manually.

import type { BackendResult } from '@/types/api'
import type { WebHook, WebHooks } from '@/types/validators/records'

export interface IWebHookService2 {
    /**
     * @permission administrator|webhook
     *
     * @param {string} filters
     *
     * @throws {string}
     *
     * @returns {number}
     */
    CountHooks: (filters: string) => BackendResult<number>

    /**
     * @permission administrator|user
     *
     * @param {number}    userid
     * @param {string} filters
     *
     * @throws {string}
     *
     * @returns {number}
     */
    CountUserHooks: (userid: number, filters: string) => BackendResult<number>

    /**
     * @permission user
     *
     * @param {string} name
     * @param {string} description
     * @param {boolean}   enabled
     * @param {string} url
     * @param {string} translation
     * @param {string} headers
     * @param {string} method
     * @param {number}    eventid
     *
     * @throws {string}
     * @throws {UnauthorizedException}
     *
     * @returns {WebHook}
     */
    CreateHook: (
        name: string,
        description: string,
        enabled: boolean,
        url: string,
        translation: string,
        headers: string,
        method: string,
        eventid: number
    ) => BackendResult<WebHook>

    /**
     * @permission administrator|user
     *
     * @param {number} id
     *
     * @throws {string}
     *
     * @returns {void}
     */
    DeleteHook: (id: number) => BackendResult<void>

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
    EnableHook: (id: number, enabled: boolean) => BackendResult<boolean>

    /**
     * @permission webhook|administrator
     *
     * @throws {string}
     *
     * @returns {WebHooks}
     */
    GetAllHooks: () => BackendResult<WebHooks>

    /**
     * @permission user|administrator
     *
     * @param {number} id
     *
     * @throws {string}
     *
     * @returns {WebHook|null}
     */
    GetHook: (id: number) => BackendResult<WebHook | null>

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
    GetHooks: (domain: string, event: string) => BackendResult<WebHooks>

    /**
     * @permission administrator|webhook
     *
     * @param {number}    page
     * @param {number}    size
     * @param {string} columns
     * @param {string} order
     * @param {string} filters
     *
     * @throws {string}
     *
     * @returns {WebHooks}
     */
    ListHooks: (page: number, size: number, columns: string, order: string, filters: string) => BackendResult<WebHooks>

    /**
     * @permission administrator|user
     *
     * @param {number}    userid
     * @param {number}    page
     * @param {number}    size
     * @param {string} columns
     * @param {string} order
     * @param {string} filters
     *
     * @throws {string}
     * @throws {\Exception}
     *
     * @returns {WebHooks}
     */
    ListUserHooks: (
        userid: number,
        page: number,
        size: number,
        columns: string,
        order: string,
        filters: string
    ) => BackendResult<WebHooks>

    /**
     * @permission administrator|user
     *
     * @param {number}             id
     * @param {string|string[]} privileges
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    PutHookPrivileges: (id: number, privileges: string | string[]) => BackendResult<boolean>

    /**
     * @permission administrator|user
     *
     * @param {number}    id
     * @param {string} name
     * @param {string} description
     * @param {boolean}   enabled
     * @param {string} url
     * @param {string} translation
     * @param {string} headers
     * @param {string} method
     * @param {number}    eventid
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    UpdateHook: (
        id: number,
        name: string,
        description: string,
        enabled: boolean,
        url: string,
        translation: string,
        headers: string,
        method: string,
        eventid: number
    ) => BackendResult<boolean>
}
