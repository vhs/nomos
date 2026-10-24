import type { FC } from 'react'

import { clsx } from 'clsx'

import type { ColBreakPoint, ColProps } from './Col.types'

const breakpoints: ColBreakPoint[] = ['default', 'xs', 'sm', 'md', 'lg', 'xl']

const Col: FC<ColProps> = ({ children, className, ...restProps }) => {
    const breakpointClasses = breakpoints
        .filter((breakpoint) => restProps[breakpoint] != null)
        .map((breakpoint) => {
            const basis =
                restProps[breakpoint]?.toString() === '12'
                    ? `${breakpoint}:basis-full`
                    : `${breakpoint}:basis-${restProps[breakpoint]}/12`

            return basis
        })

    const classNames = [className, ...breakpointClasses, 'col'].map((cn) => cn?.replace(/default:/, ''))

    if (!classNames.join(' ').includes('basis-')) {
        classNames.splice(1, 0, 'shrink grow basis-0')
    }

    return (
        <div className={clsx(classNames)} {...restProps} data-testid='Col'>
            {children}
        </div>
    )
}

export default Col
