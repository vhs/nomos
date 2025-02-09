import type { FC } from 'react'

import type { UserGrantingProps } from './UserGranting.types'

import BasePage from '@/components/05-materials/BasePage/BasePage'

const UserGranting: FC<UserGrantingProps> = () => (
    <BasePage data-testid='UserGranting' title='Grant Privileges'>
        Grant Privileges
    </BasePage>
)

export default UserGranting
