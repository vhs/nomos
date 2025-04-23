import type { FC } from 'react'

import { clsx } from 'clsx'

import type { PopoverProps } from './Popover.types'

const Popover: FC<PopoverProps> = ({ className, content, popover }) => (
    <div className={clsx([className, 'popover inline'])} data-testid='Popover'>
        <div className={clsx(['popover-content peer'])}>{content}</div>
        <div className='absolute z-above-and-beyond hidden peer-hover:block'>
            <div className='relative bottom-12 text-wrap rounded-md border border-black/50 bg-amber-50 p-1'>
                {popover}
            </div>
        </div>
    </div>
)

export default Popover
