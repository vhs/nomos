import type { FC } from 'react'

import type { ItemDeleteModalProps } from './ItemDeleteModal.types'

import Conditional from '@/components/01-atoms/Conditional/Conditional'
import Button from '@/components/02-molecules/Button/Button'
import OverlayCard from '@/components/04-composites/OverlayCard/OverlayCard'

const ItemDeleteModal: FC<ItemDeleteModalProps> = ({ show, actionHandler, closeHandler, title, children }) => (
    <Conditional condition={show} data-testid='ItemDeleteModal'>
        <OverlayCard
            title={title ?? 'Confirm Delete'}
            actions={[
                <Button key='Delete' variant='danger' onClick={actionHandler}>
                    Delete
                </Button>
            ]}
            onClose={() => {
                closeHandler()
                return false
            }}
        >
            {children}
        </OverlayCard>
    </Conditional>
)

export default ItemDeleteModal
