import moment from 'moment'

import type {
    AdminUsersColumns,
    AdminUsersCreateSchema,
    AdminUsersEditPasswordSchema,
    AdminUsersEditProfileSchema
} from './AdminUsers.types'

import type { FieldDefinitions, FilterDefinitions } from '@/lib/db/utils/query-filters'

export const AdminUserFields: FieldDefinitions<AdminUsersColumns> = [
    { title: 'User Name', field: 'username' },
    { title: 'Real Name', field: ['fname', 'lname'] },
    { title: 'Email', field: 'email' },
    { title: 'Status', field: 'active' },
    { title: 'Cash', field: 'cash' },
    { title: 'Member Since', field: 'created' },
    { title: 'Expiry', field: 'mem_expire' },
    { title: 'Last Login', field: 'lastlogin' }
]

export const AdminUserFieldsTitles = AdminUserFields.map((f) => f.title)

export const PrimaryAdminUserFilters: FilterDefinitions = [
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

export const SecondaryAdminUserFilters: FilterDefinitions = [
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

export const AdminUsersCreateDefaultValues: AdminUsersCreateSchema = {
    firstName: '',
    lastName: '',
    memType: 0,
    userEmail: '',
    userName: '',
    userPass: ''
}

export const AdminUsersEditPasswordDefaultValues: AdminUsersEditPasswordSchema = {
    password1: '',
    password2: ''
}

export const AdminUsersEditProfileDefaultValues: AdminUsersEditProfileSchema = {
    firstName: '',
    lastName: '',
    userName: '',
    userEmail: '',
    paypalEmail: '',
    stripeEmail: '',
    newsletter: false,
    cashMember: false,
    userPin: '',
    memExpire: '',
    memStatus: 'y',
    memType: 0
}
