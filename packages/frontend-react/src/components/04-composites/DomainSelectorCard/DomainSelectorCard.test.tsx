import { createRoot } from 'react-dom/client'

import DomainSelectorCard from './DomainSelectorCard'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<DomainSelectorCard />)
    root.unmount()
})
