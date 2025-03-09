import { createRoot } from 'react-dom/client'

import MembershipSelectorCard from './MembershipSelectorCard'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(
        <MembershipSelectorCard
            onUpdate={function (id: number): void {
                throw new Error(`Function (id: ${id} not implemented.`)
            }}
        />
    )
    root.unmount()
})
