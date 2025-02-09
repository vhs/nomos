import type { PrivilegeIconSettings } from './PrivilegeIcon.types'

import { checkValidIcon } from '@/lib/ui/fontawesome'
import { isString } from '@/lib/validators/guards'

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
