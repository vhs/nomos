import moment from 'moment'

import type { UsersColumns, UsersCreateSchema, UsersEditPasswordSchema, UsersEditProfileSchema } from './Users.types'

import type { FieldDefinitions, FilterDefinitions } from '@/lib/db/utils/query-filters'

export const AdminUserFields: FieldDefinitions<UsersColumns> = [
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

export const UsersCreateDefaultValues: UsersCreateSchema = {
    firstName: '',
    lastName: '',
    memType: 0,
    userEmail: '',
    userName: '',
    userPass: ''
}

export const UsersEditPasswordDefaultValues: UsersEditPasswordSchema = {
    password1: '',
    password2: ''
}

export const UsersEditProfileDefaultValues: UsersEditProfileSchema = {
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
