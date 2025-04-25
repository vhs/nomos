import type { FC } from 'react'

import type { ItemDeleteModalProps } from './ItemDeleteModal.types'

import Button from '@/components/01-atoms/Button/Button'
import Conditional from '@/components/01-atoms/Conditional/Conditional'
import OverlayCard from '@/components/05-materials/OverlayCard/OverlayCard'

const ItemDeleteModal: FC<ItemDeleteModalProps> = ({ show, actionHandler, closeHandler, title, children }) => (
    <div data-testid='ItemDeleteModal'>
        <Conditional condition={show}>
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
    </div>
)

export default ItemDeleteModal
