import type { FC } from 'react'

import clsx from 'clsx'

import type { ModalContainerProps } from './ModalContainer.types'

import Conditional from '@/components/01-atoms/Conditional/Conditional'
import Overlay from '@/components/01-atoms/Overlay/Overlay'

const ModalContainer: FC<ModalContainerProps> = ({ children, className, show }) => {
    show ??= false

    return (
        <Conditional condition={show}>
            <Overlay>
                <div
                    className={clsx([
                        className,
                        'overlay-container',
                        'm-auto w-9/12 rounded-sm border border-gray-500/50 shadow-lg'
                        // 'relative',
                        // 'left-[50vw] w-[24vw] -translate-x-[12vw]',
                        // 'top-[48vh] h-[24vh] -translate-y-[12vh]',
                    ])}
                    data-testid='ModalTitle'
                >
                    {children}
                </div>
            </Overlay>
        </Conditional>
    )
}

export default ModalContainer
