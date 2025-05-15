import { zString } from '@/lib/validators/common'

import type { FontAwesomeCategoryOption, IconName } from '@/types/fontawesome'

import { BrandIconNames, SolidIconNames } from './generated'

export const checkValidIcon = (iconName: string | null | undefined): iconName is IconName => {
    if (iconName == null) return false

    return [...BrandIconNames, ...SolidIconNames].includes(iconName)
}

export const getIconCategory = (iconName: string | null | undefined): FontAwesomeCategoryOption | null => {
    if (iconName == null) return null

    if (BrandIconNames.includes(iconName)) return 'brand'
    if (SolidIconNames.includes(iconName)) return 'solid'

    return null
}

export const zIcon = zString.refine(
    (val) => BrandIconNames.includes(val) || SolidIconNames.includes(val),
    (val) => ({ message: `${val} is not a valid FontAwesome icon` })
)
