import type { FC } from 'react'

import { clsx } from 'clsx'

import type { ButtonProps, ButtonVariantTypes } from './Button.types'

const styles: Record<ButtonVariantTypes, string> = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    success: 'btn-success',
    warning: 'btn-warning',
    danger: 'btn-danger',
    info: 'btn-info',
    light: 'btn-light',
    dark: 'btn-dark',
    link: 'btn-link',
    none: 'btn-none'
}

const Button: FC<ButtonProps> = ({ children, className, variant, ...restProps }) => {
    variant ??= 'primary'

    return (
        <button className={clsx(['btn', styles[variant], className])} data-testid='Button' {...restProps}>
            {children}
        </button>
    )
}

export default Button
