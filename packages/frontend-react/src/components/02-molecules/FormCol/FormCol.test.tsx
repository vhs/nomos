import { createRoot } from 'react-dom/client'

import FormCol from './FormCol'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<FormCol />)
    root.unmount()
})
