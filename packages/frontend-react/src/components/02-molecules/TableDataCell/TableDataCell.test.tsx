import { createRoot } from 'react-dom/client'

import TableDataCell from './TableDataCell'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<TableDataCell />)
    root.unmount()
})
