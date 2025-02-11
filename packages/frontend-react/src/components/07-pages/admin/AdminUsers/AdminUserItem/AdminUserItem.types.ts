/* eslint-disable @typescript-eslint/naming-convention */

import type { ReactNode } from 'react'

import type { User } from '@/types/records'

export interface AdminUserItemProps {
    children?: ReactNode
    data: User
}

export interface AdminUserItemData extends User {
    member_since_month: string
    member_since_rest: string
    member_for: string
    last_login: string
    expiry: string
    expiry_date_month: string
    expiry_date_rest: string
}
