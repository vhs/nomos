/* eslint-disable @typescript-eslint/naming-convention */
import { zUser } from '@/lib/validators/records'

import type { IUserObject } from '@/types/db'
import type { UserActiveStateCode } from '@/types/validators/common'
import type { Keys, Membership, Privileges, User } from '@/types/validators/records'

export default class UserObject implements User, IUserObject {
    id: number
    username: string
    password: string | null | undefined
    membership_id: number
    mem_expire: string | number | Date
    trial_used: boolean
    email: string
    fname: string
    lname: string
    token: string
    cookie_id: string
    newsletter: boolean
    cash: boolean
    userlevel: number
    notes: string | null | undefined
    created: string | number | Date
    lastlogin: string | number | Date
    lastip: string
    avatar: string | null | undefined
    active: UserActiveStateCode
    paypal_id: string
    payment_email: string
    stripe_id: string
    stripe_email: string
    keys: Keys
    privileges: Privileges
    membership: Membership
    protected privilegeCache: string[] = []

    constructor(userData: User, permissions?: string[]) {
        zUser.parse(userData)

        this.id = userData.id
        this.username = userData.username
        this.password = userData.password
        this.membership_id = userData.membership_id
        this.mem_expire = userData.mem_expire
        this.trial_used = userData.trial_used
        this.email = userData.email
        this.fname = userData.fname
        this.lname = userData.lname
        this.token = userData.token
        this.cookie_id = userData.cookie_id
        this.newsletter = userData.newsletter
        this.cash = userData.cash
        this.userlevel = userData.userlevel
        this.notes = userData.notes
        this.created = userData.created
        this.lastlogin = userData.lastlogin
        this.lastip = userData.lastip
        this.avatar = userData.avatar
        this.active = userData.active
        this.paypal_id = userData.paypal_id
        this.payment_email = userData.payment_email
        this.stripe_id = userData.stripe_id
        this.stripe_email = userData.stripe_email
        this.keys = userData.keys
        this.privileges = userData.privileges
        this.membership = userData.membership

        this.keys.forEach((key) => {
            if (key.type === 'pin') {
                if (key.key !== '') {
                    key.pinid = ('0000' + key.key.split('|')[0]).slice(-4)
                    key.pin = ('0000' + key.key.split('|')[1]).slice(-4)
                } else {
                    key.pinid = '0000'
                    key.pin = '0000'
                }
            }
        })

        this.privilegeCache = permissions ?? []

        if (this.membership?.privileges != null)
            this.membership?.privileges
                .map((p) => p.code)
                .forEach((privilegeCode) => {
                    if (!this.privilegeCache.includes(privilegeCode)) {
                        this.privilegeCache.push(privilegeCode)
                    }
                })

        this.privileges
            .map((p) => p.code)
            .forEach((privilegeCode) => {
                if (!this.privilegeCache.includes(privilegeCode)) {
                    this.privilegeCache.push(privilegeCode)
                }
            })
    }
    [k: string]: unknown

    hasPrivilege(priv: string): boolean {
        return this.privilegeCache.includes(priv)
    }
}
