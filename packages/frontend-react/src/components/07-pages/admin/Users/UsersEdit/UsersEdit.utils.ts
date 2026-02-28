import type { UsersEditPasswordSchema, UsersEditProfileSchema } from '../Users.types'

export const UsersDefaultPasswordValues: UsersEditPasswordSchema = {
    password1: '',
    password2: ''
}

export const UsersDefaultProfileValues: UsersEditProfileSchema = {
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
