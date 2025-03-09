/* eslint-disable @typescript-eslint/naming-convention */
import UserObject from '@/lib/db/models/User'

import type { Privilege, Membership, User } from '@/types/validators/records'

export const mockPrivilege: Privilege = {
    id: 1,
    code: 'test',
    name: 'Test',
    enabled: false
}

export const mockMembership: Membership = {
    id: 0,
    title: '',
    code: '',
    description: '',
    price: 0,
    days: 0,
    period: 'D',
    trial: false,
    recurring: false,
    private: false,
    active: false,
    privileges: [
        {
            id: 1,
            code: 'test',
            name: 'Test',
            enabled: false
        }
    ]
}

export const mockUser: User = {
    keys: [],
    id: 0,
    email: '',
    username: '',
    membership_id: 0,
    mem_expire: '',
    trial_used: false,
    fname: '',
    lname: '',
    token: '',
    cookie_id: '',
    newsletter: false,
    cash: false,
    userlevel: 0,
    created: '',
    lastlogin: '',
    lastip: '',
    active: 'y',
    paypal_id: '',
    payment_email: '',
    stripe_id: '',
    stripe_email: '',
    privileges: [mockPrivilege],
    membership: mockMembership
}

export const mockCurrentUser = new UserObject(mockUser)
