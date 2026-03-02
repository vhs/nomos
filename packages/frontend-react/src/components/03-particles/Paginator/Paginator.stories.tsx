import type { JSX } from 'react'

import Paginator from './Paginator'

export default {
    title: '03-Particles/Paginator'
}

export const Default = (): JSX.Element => (
    <Paginator
        currentPage={2}
        size={15}
        count={5}
        pageSelectFn={function (page: number): unknown {
            throw new Error(`Function not implemented for page ${page}`)
        }}
    />
)
