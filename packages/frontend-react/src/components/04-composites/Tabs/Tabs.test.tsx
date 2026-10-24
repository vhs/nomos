import { createRoot } from 'react-dom/client'

import Tabs from './Tabs'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<Tabs />)
    root.unmount()
})
