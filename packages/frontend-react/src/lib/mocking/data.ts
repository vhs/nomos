/* eslint-disable @typescript-eslint/naming-convention */

import PrincipalUserObject from '@/lib/db/PrincipalUser'

import type { User } from '@/types/records'

export const mockCurrentUser = { id: 1, permissions: ['door', 'vetted', 'door', 'administrator', 'user'] }

export const mockPrincipalUserData: User = {
    id: 1,
    username: 'vhs',
    membership_id: 7,
    mem_expire: '2025-11-19 19:40:01',
    trial_used: false,
    email: 'vhs@gmail.com',
    fname: 'VH',
    lname: 'S',
    token: '0',
    cookie_id: '0',
    newsletter: false,
    cash: false,
    userlevel: 9,
    notes: '',
    created: '2018-12-05 09:11:47',
    lastlogin: '2024-12-17 16:45:20',
    lastip: '172.19.0.6',
    avatar: null,
    active: 'y',
    paypal_id: '67',
    payment_email: 'what@gmail.com',
    stripe_id: '',
    stripe_email: '',
    keys: [
        {
            id: 1,
            userid: 1,
            type: 'rfid',
            key: '12345',
            created: '2024-07-22 20:30:58',
            notes: 'Added by system migration v5',
            expires: null,
            privileges: []
        },
        {
            id: 3,
            userid: 1,
            type: 'pin',
            key: '0000|3858',
            created: '2024-11-22 16:06:39',
            notes: 'User generated PIN',
            expires: null,
            privileges: [
                {
                    id: 4,
                    name: 'Inherits User Privileges',
                    code: 'inherit',
                    description: "Used with user owned keys to inherit all the owner's privileges.",
                    icon: null,
                    enabled: true
                }
            ]
        },
        {
            id: 6,
            userid: 1,
            type: 'api',
            key: '7f3a42204c5b34d0128d3390650acf0ce954b89e1d74c97c338e144212af1f18',
            created: '2024-12-15 18:32:23',
            notes: 'dsfasdf',
            expires: null,
            privileges: []
        }
    ],
    privileges: [
        {
            id: 1,
            name: 'Vetted for Keyholder',
            code: 'vetted',
            description: 'Member has been vetted for keyholder membership level',
            icon: null,
            enabled: true
        },
        {
            id: 2,
            name: 'Door Access',
            code: 'door',
            description: 'Member has door access privileges',
            icon: null,
            enabled: true
        },
        {
            id: 6,
            name: 'Administrator',
            code: 'administrator',
            description: 'Administrator level access',
            icon: null,
            enabled: true
        }
    ],
    membership: {
        id: 7,
        title: 'Key holder',
        code: 'vhs_membership_keyholder',
        description: '',
        price: 50,
        days: 1,
        period: 'M',
        trial: false,
        recurring: true,
        private: false,
        active: true,
        privileges: [
            {
                id: 2,
                name: 'Door Access',
                code: 'door',
                description: 'Member has door access privileges',
                icon: null,
                enabled: true
            }
        ]
    }
}

export const mockCurrentUserObject: PrincipalUserObject = new PrincipalUserObject(mockPrincipalUserData)

export const mockServiceData = [
    { id: 1, color: 'red' },
    { id: 2, color: 'green' },
    { id: 3, color: 'blue' }
]
