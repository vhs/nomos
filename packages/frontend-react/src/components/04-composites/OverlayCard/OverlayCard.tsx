import type { FC } from 'react'

import { redirect, useLocation, useRouter } from '@tanstack/react-router'
import { clsx } from 'clsx'

import type { OverlayCardProps } from './OverlayCard.types'

import Conditional from '@/components/01-atoms/Conditional/Conditional'
import Overlay from '@/components/01-atoms/Overlay/Overlay'
import Button from '@/components/02-molecules/Button/Button'
import Card from '@/components/03-particles/Card/Card'

const OverlayCard: FC<OverlayCardProps> = ({
    show,
    title,
    children,
    className,
    actions,
    closeLabel,
    closeVariant,
    onClose,
    redirectTo
}) => {
    closeLabel ??= actions != null ? 'Cancel' : 'Close'
    closeVariant ??= actions != null ? 'warning' : 'primary'
    show ??= true

    const router = useRouter()

    const pathname = useLocation({
        select: (location) => location.pathname
    })

    const closeHandler = (): void => {
        if (onClose == null || onClose?.()) {
            if (redirectTo != null) redirect({ to: redirectTo })
            else if (router.history.length > 0) router.history.back()
            else redirect({ to: pathname.split('/').slice(0, 2).join('/') })
        }
    }

    return (
        <div data-testid='OverlayCard'>
            <Conditional condition={show}>
                <Overlay handler={closeHandler}>
                    <Card className={clsx([className])}>
                        <Card.Header>
                            <h1>{title}</h1>
                        </Card.Header>

                        <Card.Body className='max-h-[60vh] overflow-y-scroll'>{children}</Card.Body>

                        <Card.Footer>
                            {actions}
                            <Button variant={closeVariant} onClick={closeHandler}>
                                {closeLabel}
                            </Button>
                        </Card.Footer>
                    </Card>
                </Overlay>
            </Conditional>
        </div>
    )
}

export default OverlayCard
