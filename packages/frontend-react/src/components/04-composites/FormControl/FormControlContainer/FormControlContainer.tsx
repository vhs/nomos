import type { FC } from 'react'

import clsx from 'clsx'

import type { FormControlContainerProps } from './FormControlContainer.types'

import styles from './FormControlContainer.module.css'

const FormControlContainer: FC<FormControlContainerProps> = ({
    className,
    children,
    error,
    hasFocus,
    hasPreContent,
    hasPostContent
}) => {
    error ??= false
    hasFocus ??= false
    hasPreContent ??= false
    hasPostContent ??= false

    return (
        <div
            className={clsx([
                styles.Container,
                className,
                hasPreContent ? styles.WithPreContent : null,
                hasPostContent ? styles.WithPostContent : null,
                error ? styles.Error : null,
                hasFocus ? styles.Focus : null
            ])}
            data-testid='FormControlContainer'
        >
            {children}
        </div>
    )
}

export default FormControlContainer
