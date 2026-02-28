import { useMemo, type FC } from 'react'

import { clsx } from 'clsx'

import type { FormRowProps } from './FormRow.types'

import Row from '@/components/01-atoms/Row/Row'

import { coerceErrorBoolean } from '@/lib/utils'

const FormRow: FC<FormRowProps> = ({ children, className, error }) => {
    const errorValue = useMemo(() => coerceErrorBoolean(error), [error])

    return (
        <Row className={clsx([className, 'rounded-lg', errorValue ? 'shadow-form-error' : null])} data-testid='FormRow'>
            {children}
        </Row>
    )
}

export default FormRow
