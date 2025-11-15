import type { PrivilegeIconSettings } from './PrivilegeIcon.types'

import { isString } from '@/lib/guards/common'
import { checkValidIcon } from '@/lib/ui/fontawesome'

export const getPrivilegeIconSettings = (icon: string | null | undefined): PrivilegeIconSettings => {
    if (isString(icon) && icon !== '' && !checkValidIcon(icon)) {
        return { icon: 'link-slash', css: 'opacity-50' }
    } else if (!checkValidIcon(icon)) {
        return {
            icon: 'notdef',
            css: 'opacity-25'
        }
    } else {
        return { icon, css: null }
    }
}
