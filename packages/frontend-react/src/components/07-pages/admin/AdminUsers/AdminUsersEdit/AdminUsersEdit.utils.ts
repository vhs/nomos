import type { AdminUsersEditForm } from '../AdminUsers.types'

export const AdminUsersDefaultValues: AdminUsersEditForm = {
    user: {
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
    },
    password: {
        password1: '',
        password2: ''
    }
}
