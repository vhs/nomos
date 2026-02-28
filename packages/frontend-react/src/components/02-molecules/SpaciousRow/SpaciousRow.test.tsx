import { createRoot } from 'react-dom/client'

import SpaciousRow from './SpaciousRow'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<SpaciousRow />)
    root.unmount()
})
