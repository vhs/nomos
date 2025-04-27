import { createRoot } from 'react-dom/client'

import ApiKeys from './ApiKeys'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<ApiKeys />)
    root.unmount()
})
