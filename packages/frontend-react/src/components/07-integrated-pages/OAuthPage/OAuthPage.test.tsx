import { createRoot } from 'react-dom/client'

import OAuthPage from './OAuthPage'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<OAuthPage basePath={'/test/oauth'} />)
    root.unmount()
})
