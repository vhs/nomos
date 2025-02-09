import type { FC, JSX } from 'react'

import {
    CheckCircleIcon,
    ClockIcon,
    NoSymbolIcon,
    PauseCircleIcon,
    QuestionMarkCircleIcon
} from '@heroicons/react/16/solid'

import type { AccountStatusBadgeProps } from './AccountStatusBadge.types'

import styles from './AccountStatusBadge.module.css'

const BannedIcon = <NoSymbolIcon className='text-danger' />
const PendingIcon = <ClockIcon className='text-warning' />
const ActiveIcon = <CheckCircleIcon className='text-success' />
const InactiveIcon = <PauseCircleIcon className='text-secondary' />
const UnknownIcon = <QuestionMarkCircleIcon className='text-primary' />

const getStatusIcon = (status: string | null): JSX.Element => {
    switch (status) {
        case 'Active':
            return ActiveIcon
        case 'Banned':
            return BannedIcon
        case 'Inactive':
            return InactiveIcon
        case 'Pending':
            return PendingIcon
        default:
            return UnknownIcon
    }
}

const AccountStatusBadge: FC<AccountStatusBadgeProps> = ({ status }) => {
    return (
        <div className='' data-testid='AccountStatusBadge'>
            <div className={styles.Icon}>{getStatusIcon(status)}</div>
            <div className='hidden md:inline'>&nbsp;{status}</div>
        </div>
    )
}

export default AccountStatusBadge
