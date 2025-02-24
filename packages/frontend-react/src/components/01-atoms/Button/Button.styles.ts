import type { ButtonVariantTypes } from './Button.types'

const variants: Record<ButtonVariantTypes, string> = {
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

const styles = { variants }

export default styles
