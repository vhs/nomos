import { useCallback, useEffect, type FC } from 'react'

import type { OverlayProps } from './Overlay.types'

import useOutsideClick from '@/lib/hooks/useClickOutside'

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
        <div className='fixed bottom-0 left-0 right-0 top-0 z-above-and-beyond bg-black/10' data-testid='Overlay'>
            <div className='m-auto mb-auto mt-[10vh] max-h-[80dvh] w-full md:w-[800px]' ref={ref}>
                {children}
            </div>
        </div>
    )
}

export default Overlay
