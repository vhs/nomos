import type { FC } from 'react'

import { redirect, useRouter } from '@tanstack/react-router'
import { clsx } from 'clsx'

import type { OverlayCardProps } from './OverlayCard.types'

import Button from '@/components/01-atoms/Button/Button'
import Conditional from '@/components/01-atoms/Conditional/Conditional'
import Overlay from '@/components/01-atoms/Overlay/Overlay'
import Card from '@/components/04-composites/Card/Card'

const OverlayCard: FC<OverlayCardProps> = ({ show, title, children, className, actions, closeLabel, onClose }) => {
    closeLabel ??= 'Cancel'
    show ??= true

    const router = useRouter()

    const closeHandler = (): void => {
        if (onClose == null || onClose?.())
            router.history.length > 0 ? router.history.back() : redirect({ to: '/admin' })
    }

    return (
        <div data-testid='OverlayCard'>
            <Conditional condition={show}>
                <Overlay handler={closeHandler}>
                    <div className={clsx([className, 'm-auto'])}>
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
            </Conditional>
        </div>
    )
}

export default OverlayCard
