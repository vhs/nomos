/* eslint-disable @typescript-eslint/naming-convention */

import type { FC } from 'react'

import { useRouter } from '@tanstack/react-router'
import moment from 'moment'
import useSWR from 'swr'

import type { UsersItemData, UsersItemProps } from './UsersItem.types'

import AccountStatusBadge from '@/components/01-atoms/AccountStatusBadge/AccountStatusBadge'
import Button from '@/components/01-atoms/Button/Button'
import FontAwesomeIcon from '@/components/01-atoms/FontAwesomeIcon/FontAwesomeIcon'
import Popover from '@/components/01-atoms/Popover/Popover'
import TableActionsCell from '@/components/01-atoms/TableActionsCell/TableActionsCell'
import TablePageRow from '@/components/01-atoms/TablePageRow/TablePageRow'
import EnabledCheckMark from '@/components/02-molecules/EnabledCheckMark/EnabledCheckMark'
import Loading from '@/components/02-molecules/Loading/Loading'
import TableDataCell from '@/components/02-molecules/TableDataCell/TableDataCell'

import { convertUserStatus } from '@/lib/nomos'

import type { UserActiveStates } from '@/types/validators/common'

const UsersItem: FC<UsersItemProps> = ({ fields, data }) => {
    const router = useRouter()

    const { data: statuses, isLoading: isStatusesLoading } = useSWR<UserActiveStates>(
        '/services/v2/UserService2.svc/GetStatuses'
    )

    const user: UsersItemData = {
        ...data,

        member_since_month: moment(data.created).format('MMMM'),
        member_since_rest: moment(data.created).format('Do, YYYY'),
        member_for: moment(data.created).fromNow(true),
        last_login: moment(data.lastlogin).format('MMM DD, YYYY, h:mm:ss a'),
        expiry: moment(data.mem_expire).fromNow(),
        expiry_date_month: moment(data.mem_expire).format('MMMM'),
        expiry_date_rest: moment(data.mem_expire).format('Do YYYY')
    }

    if (isStatusesLoading)
        return (
            <TablePageRow>
                <TableDataCell colSpan={9}>
                    <Loading height={5} margin={2} width={2} radius={2} />
                </TableDataCell>
            </TablePageRow>
        )

    const userStatus = user.active != null ? convertUserStatus(statuses, user.active) : null

    return (
        <TablePageRow data-testid='UsersItem'>
            <TableDataCell className='data-field' condition={fields['User Name']}>
                <Popover className='shortened' content={user.username} popover={user.username} />
            </TableDataCell>
            <TableDataCell className='data-field break-words' condition={fields['Real Name']}>
                {user.fname} {data.lname}
            </TableDataCell>
            <TableDataCell className='data-field' condition={fields.Email}>
                <Popover className='shortened' content={user.email} popover={user.email} />
            </TableDataCell>
            <TableDataCell className='data-field' condition={fields.Status}>
                <AccountStatusBadge status={userStatus} />
            </TableDataCell>
            <TableDataCell className='data-field' condition={fields.Cash}>
                <EnabledCheckMark checked={user.cash} positiveIconColour='text-primary' />
            </TableDataCell>
            <TableDataCell className='data-field' condition={fields.Created}>
                {user.member_since_month} {user.member_since_rest} ({user.member_for})
            </TableDataCell>
            <TableDataCell className='data-field' condition={fields.Expiry}>
                {user.expiry_date_month} {user.expiry_date_rest} ({user.expiry})
            </TableDataCell>
            <TableDataCell className='data-field text-balance' condition={fields.Privileges}>
                {user.privileges != null &&
                    Object.values(user.privileges)
                        .map((p) => p.code)
                        .join(', ')}
            </TableDataCell>
            <TableDataCell className='data-field break-all' condition={fields['Last Login']}>
                {user.lastlogin != null ? user.lastlogin.toLocaleString() : null}
            </TableDataCell>
            <TableActionsCell>
                <Button
                    variant='link'
                    className='btn-icon m-auto'
                    onClick={() => {
                        void router.navigate({ to: `/admin/users/${user.id}` })
                    }}
                >
                    <FontAwesomeIcon icon='edit' />
                </Button>
            </TableActionsCell>
        </TablePageRow>
    )
}

export default UsersItem
