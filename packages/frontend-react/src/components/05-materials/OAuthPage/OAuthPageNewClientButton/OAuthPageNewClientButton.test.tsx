import { createRoot } from 'react-dom/client'

import OAuthPageNewClientButton from './OAuthPageNewClientButton'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<OAuthPageNewClientButton basePath={'/test/oauth'} />)
    root.unmount()
})
