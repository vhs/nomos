import { useMemo, type FC } from 'react'

import { clsx } from 'clsx'

import type { FontAwesomeIconProps } from './FontAwesomeIcon.types'

const FontAwesomeIcon: FC<FontAwesomeIconProps> = ({
    category,
    className,
    effect,
    flip,
    icon,
    inverse,
    pullLeft,
    pullRight,
    rotate,
    size,
    stack,
    ...restProps
}) => {
    const iconClassName = useMemo(() => {
        const iconOptions = []

        iconOptions.push(`fa${(category ?? 'solid')[0]}`)

        const iconArray = Array.isArray(icon) ? icon : [icon]
        iconArray.forEach((i) => iconOptions.push(`fa-${i}`))

        if (effect != null) {
            const effectArray = Array.isArray(effect) ? effect : [effect]
            effectArray.forEach((e) => iconOptions.push(`fa-${e}`))
        }
        if (inverse != null) iconOptions.push(`fa-inverse`)
        if (pullLeft != null) iconOptions.push(`fa-pull-left`)
        if (pullRight != null) iconOptions.push(`fa-pull-right`)
        if (flip != null) iconOptions.push(`fa-${flip}`)
        if (size != null) iconOptions.push(`fa-${size}`)
        if (rotate != null) iconOptions.push(`fa-${rotate}`)
        if (stack != null) iconOptions.push(`fa-${stack === true ? 'stack' : stack}`)

        return iconOptions.join(' ')
    }, [icon, category, effect, flip, inverse, pullLeft, pullRight, rotate, size, stack])

    return <i className={clsx([iconClassName, className])} data-testid='FontAwesomeIcon' {...restProps}></i>
}

export default FontAwesomeIcon
