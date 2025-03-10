/* eslint-disable @typescript-eslint/naming-convention */

import type { FC } from 'react'

import { CheckCircleIcon } from '@heroicons/react/16/solid'
import { useRouter } from '@tanstack/react-router'
import clsx from 'clsx'
import moment from 'moment'
import useSWR from 'swr'

import type { AdminUsersItemData, AdminUsersItemProps } from './AdminUsersItem.types'

import AccountStatusBadge from '@/components/01-atoms/AccountStatusBadge/AccountStatusBadge'
import Button from '@/components/01-atoms/Button/Button'
import FontAwesomeIcon from '@/components/01-atoms/FontAwesomeIcon/FontAwesomeIcon'
import Popover from '@/components/01-atoms/Popover/Popover'
import TablePageRow from '@/components/01-atoms/TablePageRow/TablePageRow'
import ConditionalTableCell from '@/components/02-molecules/ConditionalTableCell/ConditionalTableCell'
import Loading from '@/components/02-molecules/Loading/Loading'

import { convertUserStatus } from '@/lib/nomos'

import type { UserActiveStates } from '@/types/validators/common'

const AdminUsersItem: FC<AdminUsersItemProps> = ({ data }) => {
    const router = useRouter()

    const { data: statuses, isLoading: isStatusesLoading } = useSWR<UserActiveStates>(
        '/services/v2/UserService2.svc/GetStatuses'
    )

    const user: AdminUsersItemData = {
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
            <tr>
                <td colSpan={9}>
                    <Loading height={5} margin={2} width={2} radius={2} />
                </td>
            </tr>
        )

    const userStatus = user.active != null ? convertUserStatus(statuses, user.active) : null

    return (
        <TablePageRow data-testid='AdminUsersItem'>
            <ConditionalTableCell className='data-field' condition={'username' in data}>
                <Popover className='shortened' content={user.username} popover={user.username} />
            </ConditionalTableCell>
            <ConditionalTableCell
                className='data-field break-words'
                condition={user.fname != null && user.lname != null}
            >
                {user.fname} {data.lname}
            </ConditionalTableCell>
            <ConditionalTableCell className='data-field' condition={'email' in data}>
                <Popover className='shortened' content={user.email} popover={user.email} />
            </ConditionalTableCell>
            <ConditionalTableCell className='data-field' condition={userStatus != null}>
                <AccountStatusBadge status={userStatus} />
            </ConditionalTableCell>
            <ConditionalTableCell className='data-field' condition={'cash' in data}>
                <CheckCircleIcon
                    className={clsx(['mx-auto max-h-5 max-w-5', user.cash ? 'text-primary' : 'text-gray-400/50'])}
                />
            </ConditionalTableCell>
            <ConditionalTableCell className='data-field' condition={'created' in data}>
                {user.member_since_month} {user.member_since_rest} ({user.member_for})
            </ConditionalTableCell>
            <ConditionalTableCell className='data-field' condition={'mem_expire' in data}>
                {user.expiry_date_month} {user.expiry_date_rest} ({user.expiry})
            </ConditionalTableCell>
            <ConditionalTableCell className='data-field text-balance' condition={'privileges' in data}>
                {user.privileges != null &&
                    Object.values(user.privileges)
                        .map((p) => p.code)
                        .join(', ')}
            </ConditionalTableCell>
            <ConditionalTableCell className='data-field break-all' condition={'lastlogin' in data}>
                {user.lastlogin != null ? user.lastlogin.toLocaleString() : null}
            </ConditionalTableCell>
            <td>
                <div className='grid w-full grid-flow-row justify-around'>
                    <Button
                        variant='link'
                        className='btn-icon m-auto'
                        onClick={() => {
                            void router.navigate({ to: `/admin/users/${user.id}` }) // NOSONAR
                        }}
                    >
                        <FontAwesomeIcon icon='edit' />
                    </Button>
                </div>
            </td>
        </TablePageRow>
    )
}

export default AdminUsersItem
