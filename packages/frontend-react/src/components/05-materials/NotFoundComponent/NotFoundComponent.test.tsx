import { createRoot } from 'react-dom/client'

import NotFoundComponent from './NotFoundComponent'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<NotFoundComponent />)
    root.unmount()
})
