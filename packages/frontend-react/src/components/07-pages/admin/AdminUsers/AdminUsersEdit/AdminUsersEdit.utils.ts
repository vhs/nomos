import type { AdminUsersEditPasswordSchema, AdminUsersEditProfileSchema } from '../AdminUsers.types'

export const AdminUsersDefaultPasswordValues: AdminUsersEditPasswordSchema = {
    password1: '',
    password2: ''
}

export const AdminUsersDefaultProfileValues: AdminUsersEditProfileSchema = {
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
