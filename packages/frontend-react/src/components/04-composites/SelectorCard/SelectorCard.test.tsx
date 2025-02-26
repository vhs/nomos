import { createRoot } from 'react-dom/client'

import SelectorCard from './SelectorCard'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<SelectorCard />)
    root.unmount()
})
