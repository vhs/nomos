import type { FC } from 'react'

import { clsx } from 'clsx'

import type { ButtonProps } from './Button.types'

import styles from './Button.styles'

const Button: FC<ButtonProps> = ({ children, className, small, variant, ...restProps }) => {
    variant ??= 'primary'
    small ??= false

    return (
        <button
            className={clsx([className, styles.variants[variant], small ? 'btn-sm' : null, 'btn'])}
            data-testid='Button'
            {...restProps}
        >
            {children}
        </button>
    )
}

export default Button
