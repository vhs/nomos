import type { IconProp } from '@/components/01-atoms/FontAwesomeIcon/FontAwesomeIcon.types'

export interface EnabledCheckMarkProps {
    checked?: boolean
    positiveIcon?: IconProp
    positiveIconColour?: string
    negativeIcon?: IconProp
    negativeHighlight?: boolean
    negativeHighlightColour?: string
}
