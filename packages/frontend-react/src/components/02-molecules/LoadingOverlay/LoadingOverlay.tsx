import type { FC } from 'react'

import type { LoadingOverlayProps } from './LoadingOverlay.types'

import Loading from '@/components/02-molecules/Loading/Loading'

const LoadingOverlay: FC<LoadingOverlayProps> = ({ show }) => {
    show = show ?? true

    return show ? (
        <div className='absolute bottom-0 left-0 right-0 top-0 z-above-and-beyond overflow-hidden bg-black/10'>
            <div className='relative inset-1/2 h-[100px] w-[100px] -translate-x-[50px] -translate-y-[50px] opacity-100'>
                <Loading />
            </div>
        </div>
    ) : null
}

export default LoadingOverlay
