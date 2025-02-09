import type { FC } from 'react'

import clsx from 'clsx'

import type { ModalFooterProps } from './ModalFooter.types'

const ModalFooter: FC<ModalFooterProps> = ({ children, className }) => (
    <div
        className={clsx(['flex flex-row justify-between rounded-b-lg rounded-t-none border-t p-2', className])}
        data-testid='ModalFooter'
    >
        {children}
    </div>
)

export default ModalFooter
