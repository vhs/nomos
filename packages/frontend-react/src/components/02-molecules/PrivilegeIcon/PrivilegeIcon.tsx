import type { FC } from 'react'

import { clsx } from 'clsx'

import type { PrivilegeIconProps } from './PrivilegeIcon.types'

import FontAwesomeIcon from '@/components/01-atoms/FontAwesomeIcon/FontAwesomeIcon'

import type { IconName } from '@/types/fontawesome'

import { getPrivilegeIconSettings } from './PrivilegeIcon.ui'

const PrivilegeIcon: FC<PrivilegeIconProps> = ({ icon, className, size }) => {
    const settings = getPrivilegeIconSettings(icon)

    return (
        <FontAwesomeIcon
            data-testid='PrivilegeIcon'
            className={clsx([className, settings?.css])}
            icon={settings.icon as IconName}
            size={size ?? '3x'}
        />
    )
}

export default PrivilegeIcon
