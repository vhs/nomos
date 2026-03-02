import { createRoot } from 'react-dom/client'

import RootComponent from './RootComponent'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<RootComponent />)
    root.unmount()
})
