import { createRoot } from 'react-dom/client'

import OAuthPageNewClientModal from './OAuthPageNewClientModal'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<OAuthPageNewClientModal />)
    root.unmount()
})
