import moment from 'moment'

import type { FilterDefinition } from '@/components/05-materials/TablePage/TablePage.types'

export const AdminUserFields = [
    // { title: 'ID', field: 'id' },
    { title: 'User Name', field: 'username' },
    { title: 'Real Name', field: ['fname', 'lname'] },
    { title: 'Email', field: 'email' },
    { title: 'Status', field: 'active' },
    { title: 'Cash', field: 'cash' },
    { title: 'Member Since', field: 'created' },
    { title: 'Expiry', field: 'mem_expire' },
    // { title: 'Privileges', field: 'privileges' },
    { title: 'Last Login', field: 'lastlogin' }
]

export const PrimaryAdminUserFilters: FilterDefinition[] = [
    {
        id: 'showExpired',
        label: 'Expired Users',
        filter: {
            column: 'mem_expire',
            operator: '<=',
            value: moment().format('YYYY-MM-DD hh:mm:ss')
        }
    },
    {
        id: 'showCash',
        label: 'Cash Users',
        filter: {
            column: 'cash',
            operator: '=',
            value: '1'
        }
    }
]

export const SecondaryAdminUserFilters: FilterDefinition[] = [
    {
        id: 'showActive',
        label: 'Active Users',
        filter: {
            column: 'active',
            operator: '=',
            value: 'y'
        }
    },
    {
        id: 'showPending',
        label: 'Pending Users',
        filter: {
            column: 'active',
            operator: '=',
            value: 't'
        }
    },
    {
        id: 'showInactive',
        label: 'Inactive Users',
        filter: {
            column: 'active',
            operator: '=',
            value: 'n'
        }
    },
    {
        id: 'showBanned',
        label: 'Banned Users',
        filter: {
            column: 'active',
            operator: '=',
            value: 'b'
        }
    }
]
