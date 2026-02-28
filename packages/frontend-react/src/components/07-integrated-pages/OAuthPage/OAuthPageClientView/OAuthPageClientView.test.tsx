import { createRoot } from 'react-dom/client'

import OAuthPageClientView from './OAuthPageClientView'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<OAuthPageClientView />)
    root.unmount()
})
