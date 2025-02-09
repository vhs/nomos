import type { FC } from 'react'

import clsx from 'clsx'

import type { ModalBodyProps } from './ModalBody.types'

const ModalBody: FC<ModalBodyProps> = ({ children, className }) => (
    <div className={clsx(['grid p-2', className])} data-testid='ModalBody'>
        {children}
    </div>
)

export default ModalBody
