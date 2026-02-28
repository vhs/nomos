import type { FC } from 'react'

import PulseLoader from 'react-spinners/PulseLoader'

import type { LoadingProps } from './Loading.types'

import { DefaultLoadingProps } from './Loading.utils'

const Loading: FC<LoadingProps> = (overrideProps) => {
    overrideProps ??= {}

    return (
        <div className='relative z-above-and-beyond h-full min-h-[100px] w-full min-w-[200px]'>
            <div className='opacity-full absolute bottom-0 left-0 right-0 top-0 m-auto h-[100px] w-[200px]'>
                <PulseLoader {...{ ...DefaultLoadingProps, ...overrideProps }} />
            </div>
        </div>
    )
}

export default Loading
