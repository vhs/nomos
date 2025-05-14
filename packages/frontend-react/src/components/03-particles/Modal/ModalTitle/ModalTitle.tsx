import type { FC } from 'react'

import clsx from 'clsx'

import type { ModalTitleProps } from './ModalTitle.types'

const ModalTitle: FC<ModalTitleProps> = ({ children, className }) => (
    <div className={clsx([className])} data-testid='ModalTitle'>
        {children}
    </div>
)

export default ModalTitle
