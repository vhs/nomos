import type { FC } from 'react'

import clsx from 'clsx'

import type { ModalBodyProps } from './ModalBody.types'

const ModalBody: FC<ModalBodyProps> = ({ children, className }) => (
    <div className={clsx([className, 'grid p-2'])} data-testid='ModalBody'>
        {children}
    </div>
)

export default ModalBody
