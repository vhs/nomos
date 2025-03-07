/* eslint-disable @typescript-eslint/max-params */
/* eslint-disable @typescript-eslint/naming-convention */
// Do not change manually.

import { backendCall } from '@/lib/backend'

import type { BackendResult } from '@/types/api'
import type { IPrivilegeService2 } from '@/types/providers/IPrivilegeService2'
import type { Privilege, Privileges } from '@/types/validators/records'

export default class PrivilegeService2 implements IPrivilegeService2 {
    /**
     * @permission administrator|user|grants
     *
     * @param {string} filters
     *
     * @throws {string}
     *
     * @returns {number}
     */
    async CountPrivileges(filters: string): BackendResult<number> {
        return await backendCall('/services/v2/PrivilegeService2.svc/CountPrivileges', { filters })
    }

    /**
     * @permission administrator
     *
     * @param {string}  name
     * @param {string}  code
     * @param {string}  description
     * @param {string}  icon
     * @param {boolean} enabled
     *
     * @throws {string}
     *
     * @returns {Privilege}
     */
    async CreatePrivilege(
        name: string,
        code: string,
        description: string,
        icon: string,
        enabled: boolean
    ): BackendResult<Privilege> {
        return await backendCall('/services/v2/PrivilegeService2.svc/CreatePrivilege', {
            name,
            code,
            description,
            icon,
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
    async DeletePrivilege(id: number): BackendResult<void> {
        return await backendCall('/services/v2/PrivilegeService2.svc/DeletePrivilege', { id })
    }

    /**
     * @permission administrator|user|grants
     *
     * @throws {string}
     *
     * @returns {Privileges}
     */
    async GetAllPrivileges(): BackendResult<Privileges> {
        return await backendCall('/services/v2/PrivilegeService2.svc/GetAllPrivileges', {})
    }

    /**
     * @permission administrator
     *
     * @throws {string}
     *
     * @returns {string[]}
     */
    async GetAllSystemPermissions(): BackendResult<string[]> {
        return await backendCall('/services/v2/PrivilegeService2.svc/GetAllSystemPermissions', {})
    }

    /**
     * @permission user
     *
     * @param {number} id
     *
     * @throws {string}
     *
     * @returns {Privilege}
     */
    async GetPrivilege(id: number): BackendResult<Privilege> {
        return await backendCall('/services/v2/PrivilegeService2.svc/GetPrivilege', { id })
    }

    /**
     * @permission administrator|user
     *
     * @param {number} userid
     *
     * @throws {string}
     *
     * @returns {Privileges}
     */
    async GetUserPrivileges(userid: number): BackendResult<Privileges> {
        return await backendCall('/services/v2/PrivilegeService2.svc/GetUserPrivileges', { userid })
    }

    /**
     * @permission administrator|user|grants
     *
     * @param {number} page
     * @param {number} size
     * @param {string} columns
     * @param {string} order
     * @param {string} filters
     *
     * @throws {string}
     *
     * @returns {Privileges}
     */
    async ListPrivileges(
        page: number,
        size: number,
        columns: string,
        order: string,
        filters: string
    ): BackendResult<Privileges> {
        return await backendCall('/services/v2/PrivilegeService2.svc/ListPrivileges', {
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
     * @param {number} id
     * @param {string} description
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    async UpdatePrivilegeDescription(id: number, description: string): BackendResult<boolean> {
        return await backendCall('/services/v2/PrivilegeService2.svc/UpdatePrivilegeDescription', { id, description })
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
    async UpdatePrivilegeEnabled(id: number, enabled: boolean): BackendResult<boolean> {
        return await backendCall('/services/v2/PrivilegeService2.svc/UpdatePrivilegeEnabled', { id, enabled })
    }

    /**
     * @permission administrator
     *
     * @param {number} id
     * @param {string} icon
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    async UpdatePrivilegeIcon(id: number, icon: string): BackendResult<boolean> {
        return await backendCall('/services/v2/PrivilegeService2.svc/UpdatePrivilegeIcon', { id, icon })
    }

    /**
     * @permission administrator
     *
     * @param {number} id
     * @param {string} name
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    async UpdatePrivilegeName(id: number, name: string): BackendResult<boolean> {
        return await backendCall('/services/v2/PrivilegeService2.svc/UpdatePrivilegeName', { id, name })
    }

    private static _instance: PrivilegeService2

    public static getInstance(): PrivilegeService2 {
        if (PrivilegeService2._instance == null) {
            PrivilegeService2._instance = new PrivilegeService2()
        }

        return PrivilegeService2._instance
    }
}
