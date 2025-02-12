import type { FC } from 'react'

import { clsx } from 'clsx'

import type { PopoverProps } from './Popover.types'

const Popover: FC<PopoverProps> = ({ className, content, popover }) => (
    <div className={clsx(['popover', className])} data-testid='Popover'>
        <div className={clsx(['peer w-full overflow-hidden text-ellipsis'])}>{content}</div>
        <div className='absolute z-above-and-beyond hidden peer-hover:block'>
            <div className='relative bottom-12 rounded-md border border-black/50 bg-white p-1'>{popover}</div>
        </div>
    </div>
)

export default Popover
