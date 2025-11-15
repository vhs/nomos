/* eslint-disable @typescript-eslint/naming-convention */
import type { FC } from 'react'

import type { ModalBodyProps } from './ModalBody/ModalBody.types'
import type { ModalContainerProps } from './ModalContainer/ModalContainer.types'
import type { ModalFooterProps } from './ModalFooter/ModalFooter.types'
import type { ModalHeaderProps } from './ModalHeader/ModalHeader.types'
import type { ModalTitleProps } from './ModalTitle/ModalTitle.types'

export type ModalComponent = FC<ModalContainerProps> & {
    Body: FC<ModalBodyProps>
    Header: FC<ModalHeaderProps>
    Footer: FC<ModalFooterProps>
    Title: FC<ModalTitleProps>
}
