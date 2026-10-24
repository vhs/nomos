/* eslint-disable @typescript-eslint/naming-convention */

import type { TablePageItemComponent } from '@/types/ui'
import type { User } from '@/types/validators/records'

export interface UsersItemProps extends TablePageItemComponent<User> {}

export interface UsersItemData extends User {
    member_since_month: string
    member_since_rest: string
    member_for: string
    last_login: string
    expiry: string
    expiry_date_month: string
    expiry_date_rest: string
}

export type * from '../Users.types'
