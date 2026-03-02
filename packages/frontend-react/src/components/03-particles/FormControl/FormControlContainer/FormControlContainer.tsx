import { useMemo, type FC } from 'react'

import clsx from 'clsx'

import type { FormControlContainerProps } from './FormControlContainer.types'

import { coerceErrorBoolean } from '@/lib/utils'

import styles from './FormControlContainer.module.css'

const FormControlContainer: FC<FormControlContainerProps> = ({
    className,
    children,
    error,
    hasFocus,
    hasPreContent,
    hasPostContent
}) => {
    hasFocus ??= false
    hasPreContent ??= false
    hasPostContent ??= false

    const hasError = useMemo(() => coerceErrorBoolean(error), [error])

    return (
        <div
            className={clsx([
                styles.Container,
                className,
                hasPreContent ? styles.WithPreContent : null,
                hasPostContent ? styles.WithPostContent : null,
                hasError ? styles.WithError : null,
                hasFocus ? styles.Focus : null
            ])}
            data-testid='FormControlContainer'
        >
            {children}
        </div>
    )
}

export default FormControlContainer
