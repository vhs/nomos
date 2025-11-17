import type { CombinedPrivileges } from '@/types/common'
import type { CastReactElement } from '@/types/utils'

export interface CurrentUserPrivilegesListProps extends CastReactElement<'div'> {
    privileges: CombinedPrivileges
}
