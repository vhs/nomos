import type { FC } from 'react'

import { clsx } from 'clsx'

import type { EnabledCheckMarkProps } from './EnabledCheckMark.types'

import FontAwesomeIcon from '@/components/01-atoms/FontAwesomeIcon/FontAwesomeIcon'

const EnabledCheckMark: FC<EnabledCheckMarkProps> = ({
    checked,
    positiveIcon,
    positiveIconColour,
    negativeIcon,
    negativeHighlight,
    negativeHighlightColour
}) => {
    checked ??= false
    positiveIcon ??= 'check-circle'
    positiveIconColour ??= 'text-green-500'
    negativeIcon ??= 'check-circle'
    negativeHighlight ??= false
    negativeHighlightColour ??= 'text-red-500'

    const negativeColour = negativeHighlight ? negativeHighlightColour : 'text-gray-500'

    return (
        <div data-testid='EnabledCheckMark'>
            <FontAwesomeIcon
                className={clsx(['h-5 w-5 text-xl', checked ? positiveIconColour : negativeColour])}
                icon={checked ? positiveIcon : negativeIcon}
            />
        </div>
    )
}

export default EnabledCheckMark
