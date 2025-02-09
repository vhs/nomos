import type { FC } from 'react'

import { redirect, useRouter } from '@tanstack/react-router'
import { clsx } from 'clsx'

import type { OverlayCardProps } from './OverlayCard.types'

import Button from '@/components/01-atoms/Button/Button'
import Overlay from '@/components/01-atoms/Overlay/Overlay'
import Card from '@/components/04-composites/Card'

const OverlayCard: FC<OverlayCardProps> = ({ title, children, className, actions, closeLabel, onClose }) => {
    closeLabel ??= 'Cancel'

    const router = useRouter()

    const closeHandler = (): void => {
        if (onClose == null || onClose?.())
            router.history.length > 0 ? router.history.back() : redirect({ to: '/admin' })
    }

    return (
        <div data-testid='OverlayCard'>
            <Overlay handler={closeHandler}>
                <div className={clsx(['m-auto', className])}>
                    <Card>
                        <Card.Header>
                            <h1>{title}</h1>
                        </Card.Header>

                        <Card.Body className='max-h-[60vh] overflow-y-scroll'>{children}</Card.Body>

                        <Card.Footer>
                            {actions}
                            <Button variant='warning' onClick={closeHandler}>
                                {closeLabel}
                            </Button>
                        </Card.Footer>
                    </Card>
                </div>
            </Overlay>
        </div>
    )
}

export default OverlayCard
