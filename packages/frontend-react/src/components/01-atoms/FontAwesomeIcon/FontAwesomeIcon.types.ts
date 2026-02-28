import type {
    FAB,
    FAS,
    FontAwesomeCategoryOption,
    FontAwesomeEffectOption,
    FontAwesomeFlipOption,
    FontAwesomeRotateOption,
    FontAwesomeSizeOption,
    FontAwesomeStackOption
} from '@/types/fontawesome'
import type { CastReactElement, SingleOrArray } from '@/types/utils'

export type IconProp = FAB | FAS | string[]

export interface FontAwesomeIconProps extends Partial<CastReactElement<'i'>> {
    icon: IconProp
    category?: FontAwesomeCategoryOption
    className?: string
    effect?: SingleOrArray<FontAwesomeEffectOption>
    flip?: FontAwesomeFlipOption
    inverse?: boolean
    pullLeft?: boolean
    pullRight?: boolean
    rotate?: FontAwesomeRotateOption
    size?: FontAwesomeSizeOption
    stack?: FontAwesomeStackOption
}
