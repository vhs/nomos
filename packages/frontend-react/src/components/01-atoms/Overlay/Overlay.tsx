import { useCallback, useEffect, type FC } from 'react'

import type { OverlayProps } from './Overlay.types'

import { useOutsideClick } from '@/lib/hooks/useClickOutside'

const Overlay: FC<OverlayProps> = ({ children, handler }) => {
    const clickHandler = useCallback(() => {
        if (handler != null) handler(false)
    }, [handler])

    const ref = useOutsideClick<HTMLDivElement>(clickHandler)

    useEffect(() => {
        ;(document.getElementsByTagName('HTML')[0] as HTMLElement).style.overflow = 'hidden'

        return () => {
            ;(document.getElementsByTagName('HTML')[0] as HTMLElement).style.overflow = 'auto'
        }
    }, [])

    return (
        <div className='modal' data-testid='Overlay'>
            <div className='modal-container'>
                <div className='modal-content' ref={ref}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Overlay
