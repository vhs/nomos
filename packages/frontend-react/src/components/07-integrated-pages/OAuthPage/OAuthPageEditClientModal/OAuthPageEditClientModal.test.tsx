import { createRoot } from 'react-dom/client'

import OAuthPageEditClientModal from './OAuthPageEditClientModal'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<OAuthPageEditClientModal appClientId={0} />)
    root.unmount()
})
