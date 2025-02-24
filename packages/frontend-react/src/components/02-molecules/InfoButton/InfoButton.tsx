import { useCallback, useState, type FC } from 'react'

import { clsx } from 'clsx'

import type { InfoButtonProps } from './InfoButton.types'

import Button from '@/components/01-atoms/Button/Button'
import FontAwesomeIcon from '@/components/01-atoms/FontAwesomeIcon/FontAwesomeIcon'
import OverlayCard from '@/components/05-materials/OverlayCard/OverlayCard'

const InfoButton: FC<InfoButtonProps> = ({ className, title, children }) => {
    const [showOverlay, setShowOverlay] = useState<boolean>(false)

    const toggleOverlay = useCallback((): void => {
        setShowOverlay(!showOverlay)
    }, [setShowOverlay, showOverlay])

    return (
        <>
            <Button
                className={clsx([className, 'max-h-4 max-w-8 text-center align-top'])}
                variant='none'
                onClick={toggleOverlay}
            >
                <FontAwesomeIcon icon='info' />
            </Button>
            <OverlayCard
                show={showOverlay}
                title={title ?? ''}
                onClose={() => {
                    setShowOverlay(false)
                    return false
                }}
            >
                {children}
            </OverlayCard>
        </>
    )
}

export default InfoButton
