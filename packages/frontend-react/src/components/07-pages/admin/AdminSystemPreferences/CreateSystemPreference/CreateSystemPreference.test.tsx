import { createRoot } from 'react-dom/client'

import CreateSystemPreference from './CreateSystemPreference'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<CreateSystemPreference />)
    root.unmount()
})
