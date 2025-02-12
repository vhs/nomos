import { createRoot } from 'react-dom/client'

import type { UserActiveStateCodes } from '@/types/common'

import StatusSelectorCard from './StatusSelectorCard'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(
        <StatusSelectorCard
            onUpdate={function (code: UserActiveStateCodes): void {
                throw new Error(`Function (code: ${code} not implemented.`)
            }}
        />
    )
    root.unmount()
})
