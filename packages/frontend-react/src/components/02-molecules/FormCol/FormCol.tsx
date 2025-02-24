import type { FC } from 'react'

import { clsx } from 'clsx'

import type { FormColProps } from './FormCol.types'

import Col from '@/components/01-atoms/Col/Col'

const FormCol: FC<FormColProps> = ({ children, className, error }) => {
    error ??= false

    return (
        <Col className={clsx([className, 'rounded-lg', error ? 'shadow-form-error' : null])} data-testid='FormCol'>
            {children}
        </Col>
    )
}

export default FormCol
