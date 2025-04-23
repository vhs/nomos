/* eslint-disable @typescript-eslint/naming-convention */
// Do not change manually.

import type { Filter } from '@/lib/db/utils/query-filters'

import type { BackendResult } from '@/types/api'
import type { Privilege, Privileges } from '@/types/validators/records'

export interface IPrivilegeService2 {
    /**
     * @permission administrator|user|grants
     *
     * @param {Filter|null} filters
     *
     * @returns {number}
     */
    CountPrivileges: (filters: Filter | null) => BackendResult<number>

    /**
     * @permission administrator
     *
     * @param {string}  name
     * @param {string}  code
     * @param {string}  description
     * @param {string}  icon
     * @param {boolean} enabled
     *
     * @returns {Privilege}
     */
    CreatePrivilege: (
        name: string,
        code: string,
        description: string,
        icon: string,
        enabled: boolean
    ) => BackendResult<Privilege>

    /**
     * @permission administrator
     *
     * @param {number} id
     *
     * @returns {void}
     */
    DeletePrivilege: (id: number) => BackendResult<void>

    /**
     * @permission administrator|user|grants
     *
     * @returns {Privileges}
     */
    GetAllPrivileges: () => BackendResult<Privileges>

    /**
     * @permission administrator
     *
     * @returns {string[]}
     */
    GetAllSystemPermissions: () => BackendResult<string[]>

    /**
     * @permission user
     *
     * @param {number} id
     *
     * @returns {Privilege}
     */
    GetPrivilege: (id: number) => BackendResult<Privilege>

    /**
     * @permission administrator|user|grants
     *
     * @param {number} userid
     *
     * @returns {Privileges}
     */
    GetUserPrivileges: (userid: number) => BackendResult<Privileges>

    /**
     * @permission administrator|user|grants
     *
     * @param {number}      page
     * @param {number}      size
     * @param {string}      columns
     * @param {string}      order
     * @param {Filter|null} filters
     *
     * @returns {Privileges}
     */
    ListPrivileges: (
        page: number,
        size: number,
        columns: string,
        order: string,
        filters: Filter | null
    ) => BackendResult<Privileges>

    /**
     * @permission administrator
     *
     * @param {number} id
     * @param {string} description
     *
     * @returns {boolean}
     */
    UpdatePrivilegeDescription: (id: number, description: string) => BackendResult<boolean>

    /**
     * @permission administrator
     *
     * @param {number}  id
     * @param {boolean} enabled
     *
     * @returns {boolean}
     */
    UpdatePrivilegeEnabled: (id: number, enabled: boolean) => BackendResult<boolean>

    /**
     * @permission administrator
     *
     * @param {number} id
     * @param {string} icon
     *
     * @returns {boolean}
     */
    UpdatePrivilegeIcon: (id: number, icon: string) => BackendResult<boolean>

    /**
     * @permission administrator
     *
     * @param {number} id
     * @param {string} name
     *
     * @returns {boolean}
     */
    UpdatePrivilegeName: (id: number, name: string) => BackendResult<boolean>
}
