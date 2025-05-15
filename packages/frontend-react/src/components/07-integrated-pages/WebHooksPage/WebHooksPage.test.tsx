import { createRoot } from 'react-dom/client'

import WebHooksPage from './WebHooksPage'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<WebHooksPage />)
    root.unmount()
})
