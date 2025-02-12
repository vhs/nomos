import { createRoot } from 'react-dom/client'

import Login from './Login'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<Login />)
    root.unmount()
})
