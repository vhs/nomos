import type { CastReactElement } from '@/types/utils'

export interface AccountStatusBadgeProps extends CastReactElement<'div'> {
    status: string | null
}
