import type { FC } from 'react'

import { clsx } from 'clsx'

import type { SpaciousRowProps } from './SpaciousRow.types'

import Row from '@/components/01-atoms/Row/Row'

const SpaciousRow: FC<SpaciousRowProps> = ({ className, children, ...restProps }) => (
    <Row className={clsx([className, 'spacious'])} data-testid='SpaciousRow' {...restProps}>
        {children}
    </Row>
)

export default SpaciousRow
