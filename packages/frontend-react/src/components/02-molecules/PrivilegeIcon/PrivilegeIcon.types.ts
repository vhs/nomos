import type { FontAwesomeIconProps } from '@/components/01-atoms/FontAwesomeIcon/FontAwesomeIcon.types'

export interface PrivilegeIconProps extends Omit<FontAwesomeIconProps, 'icon'> {
    icon: string | null | undefined
    className?: string
}

export interface PrivilegeIconSettings {
    icon: string | null | undefined
    css: string | null | undefined
}
