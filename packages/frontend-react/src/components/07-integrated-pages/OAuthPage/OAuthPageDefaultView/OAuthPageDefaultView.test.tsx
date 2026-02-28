import { createRoot } from 'react-dom/client'

import OAuthPageDefaultView from './OAuthPageDefaultView'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<OAuthPageDefaultView basePath={'/test/oauth'} />)
    root.unmount()
})
