/* eslint-disable @typescript-eslint/max-params */
/* eslint-disable @typescript-eslint/naming-convention */
// This file was generated by generate-providers-types.sh on Wed Feb  5 22:40:42 UTC 2025.
// Do not change manually.

import type { BackendResult } from '@/types/custom'
import type { Privilege } from '@/types/records'

export interface IPrivilegeService2 {
    /**
     * @permission administrator|user|grants
     *
     * @param {string} $filters
     *
     * @throws {string}
     *
     * @returns {number}
     */
    CountPrivileges: (filters: string) => BackendResult<number>

    /**
     * @permission administrator
     *
     * @param {string} $name
     * @param {string} $code
     * @param {string} $description
     * @param {string} $icon
     * @param {boolean}   $enabled
     *
     * @throws {string}
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
     * @param {number} $id
     *
     * @throws {string}
     *
     * @returns {void}
     */
    DeletePrivilege: (id: number) => BackendResult<void>

    /**
     * @permission administrator|user|grants
     *
     * @throws {string}
     *
     * @returns {Privilege[]}
     */
    GetAllPrivileges: () => BackendResult<Privilege[]>

    /**
     * @permission administrator
     *
     * @throws {string}
     *
     * @returns {string[]}
     */
    GetAllSystemPermissions: () => BackendResult<string[]>

    /**
     * @permission user
     *
     * @param {number} $id
     *
     * @throws {string}
     *
     * @returns {Privilege}
     */
    GetPrivilege: (id: number) => BackendResult<Privilege>

    /**
     * @permission administrator|user
     *
     * @param {number} $userid
     *
     * @throws {string}
     *
     * @returns {Privilege[]}
     */
    GetUserPrivileges: (userid: number) => BackendResult<Privilege[]>

    /**
     * @permission administrator|user|grants
     *
     * @param {number}    $page
     * @param {number}    $size
     * @param {string} $columns
     * @param {string} $order
     * @param {string} $filters
     *
     * @throws {string}
     *
     * @returns {Privilege[]}
     */
    ListPrivileges: (
        page: number,
        size: number,
        columns: string,
        order: string,
        filters: string
    ) => BackendResult<Privilege[]>

    /**
     * @permission administrator
     *
     * @param {number}    $id
     * @param {string} $description
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    UpdatePrivilegeDescription: (id: number, description: string) => BackendResult<boolean>

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
    UpdatePrivilegeEnabled: (id: number, enabled: boolean) => BackendResult<boolean>

    /**
     * @permission administrator
     *
     * @param {number}    $id
     * @param {string} $icon
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    UpdatePrivilegeIcon: (id: number, icon: string) => BackendResult<boolean>

    /**
     * @permission administrator
     *
     * @param {number}    $id
     * @param {string} $name
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    UpdatePrivilegeName: (id: number, name: string) => BackendResult<boolean>
}
