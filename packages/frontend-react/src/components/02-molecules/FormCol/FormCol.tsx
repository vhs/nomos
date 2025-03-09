import { useMemo, type FC } from 'react'

import { clsx } from 'clsx'

import type { FormColProps } from './FormCol.types'

import Col from '@/components/01-atoms/Col/Col'

import { coerceErrorBoolean } from '@/lib/utils'

const FormCol: FC<FormColProps> = ({ children, className, error }) => {
    const errorValue = useMemo(() => coerceErrorBoolean(error), [error])

    return (
        <Col className={clsx([className, 'rounded-lg', errorValue ? 'shadow-form-error' : null])} data-testid='FormCol'>
            {children}
        </Col>
    )
}

export default FormCol
