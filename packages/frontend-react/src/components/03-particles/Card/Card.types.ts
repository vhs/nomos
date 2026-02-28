/* eslint-disable @typescript-eslint/naming-convention */
import type { FC } from 'react'

import type { CardBodyProps } from './CardBody/CardBody.types'
import type { CardContainerProps } from './CardContainer/CardContainer.types'
import type { CardFooterProps } from './CardFooter/CardFooter.types'
import type { CardHeaderProps } from './CardHeader/CardHeader.types'

export type CardComponent = FC<CardContainerProps> & {
    Body: FC<CardBodyProps>
    Header: FC<CardHeaderProps>
    Footer: FC<CardFooterProps>
}
