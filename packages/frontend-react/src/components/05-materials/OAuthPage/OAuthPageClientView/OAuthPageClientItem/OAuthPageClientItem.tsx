import { useState, type FC } from 'react'

import { useRouter } from '@tanstack/react-router'
import moment from 'moment'
import { toast } from 'react-toastify'
import { mutate } from 'swr'

import type { OAuthPageClientItemProps } from './OAuthPageClientItem.types'

import Button from '@/components/01-atoms/Button/Button'
import FontAwesomeIcon from '@/components/01-atoms/FontAwesomeIcon/FontAwesomeIcon'
import TableActionsCell from '@/components/01-atoms/TableActionsCell/TableActionsCell'
import TablePageRow from '@/components/01-atoms/TablePageRow/TablePageRow'
import TableDataCell from '@/components/02-molecules/TableDataCell/TableDataCell'
import OverlayCard from '@/components/05-materials/OverlayCard/OverlayCard'

import OAuthService2 from '@/lib/providers/OAuthService2'

import type { ValidRoutePath } from '@/types/routing'

import { useOAuthPageContext } from '../../OAuthPage.context'
import { getOAuthTermByScope } from '../../OAuthPage.utils'

const OAuthPageClientItem: FC<OAuthPageClientItemProps> = ({ fields, data }) => {
    const router = useRouter()

    const { basePath, scope } = useOAuthPageContext()

    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const closeDeleteModal = (): void => {
        setShowDeleteModal(false)
    }

    const openDeleteModal = (): void => {
        setShowDeleteModal(true)
    }

    const { id, name, secret, expires, userid, description, url, redirecturi, enabled } = data

    const openEditModal = (): void => {
        const to = `${basePath}/$id` as ValidRoutePath

        void router.navigate({ to, params: { id: id.toString() } })
    }

    const deleteOAuthClient = async (): Promise<void> => {
        await toast.promise(OAuthService2.getInstance().DeleteClient(id), {
            error: getOAuthTermByScope('deleteOAuthError', scope),
            pending: getOAuthTermByScope('deleteOAuthPending', scope),
            success: getOAuthTermByScope('deleteOAuthSuccess', scope)
        })

        scope === 'system'
            ? await mutate('/services/v2/OAuthService2.svc/CountClients')
            : await mutate(`/services/v2/OAuthService2.svc/CountUserClients`)

        scope === 'system'
            ? await mutate('/services/v2/OAuthService2.svc/ListClients')
            : await mutate(`/services/v2/OAuthService2.svc/ListUserClients`)

        closeDeleteModal()
    }

    return (
        <>
            <TablePageRow data-testid='OAuthPageClientItem' fields={Object.keys(fields).length + 1}>
                <TableDataCell condition={fields.Name}>{name}</TableDataCell>
                <TableDataCell condition={fields.Description}>{description}</TableDataCell>
                <TableDataCell condition={fields.Url}>{url}</TableDataCell>
                <TableDataCell condition={fields.Redirecturi}>{redirecturi}</TableDataCell>
                <TableDataCell condition={fields.Owner}>{userid ?? ''}</TableDataCell>
                <TableDataCell condition={fields['Client Id']}>{id}</TableDataCell>
                <TableDataCell condition={fields['Client Secret']}>{secret}</TableDataCell>
                <TableDataCell className='text-nowrap' condition={fields.Header}>
                    {`Authorization: Basic ${window.btoa(`${id}:${secret}`)}`}
                </TableDataCell>
                <TableDataCell condition={fields.Expires}>
                    {moment(expires).format('MMMM Do YYYY')} ({moment(expires).fromNow()})
                </TableDataCell>
                <TableDataCell condition={fields.Enabled}>{enabled ? 'Yes' : 'No'}</TableDataCell>
                <TableActionsCell>
                    <Button circle onClick={openEditModal}>
                        <FontAwesomeIcon icon='edit' />
                    </Button>
                    <Button className='btn-circle' variant='danger' onClick={openDeleteModal}>
                        <FontAwesomeIcon icon='times' />
                    </Button>
                </TableActionsCell>
            </TablePageRow>
            <OverlayCard
                show={showDeleteModal}
                title='Confirm Delete'
                actions={[
                    <Button
                        key='Delete'
                        variant='primary'
                        onClick={() => {
                            void deleteOAuthClient()
                        }}
                    >
                        Delete
                    </Button>
                ]}
                onClose={() => {
                    closeDeleteModal()
                    return false
                }}
            >
                Are you sure you want to delete this OAuth client?
            </OverlayCard>
        </>
    )
}

export default OAuthPageClientItem
