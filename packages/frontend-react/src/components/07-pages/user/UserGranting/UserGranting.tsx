import type { FC } from 'react'

import type { UserGrantingProps } from './UserGranting.types'

import UnderConstructionBanner from '@/components/01-atoms/UnderConstructionBanner/UnderConstructionBanner'
import BasePage from '@/components/05-materials/BasePage/BasePage'

const UserGranting: FC<UserGrantingProps> = () => (
    <BasePage data-testid='UserGranting' title='Grant Privileges'>
        <UnderConstructionBanner />
    </BasePage>
)

export default UserGranting
