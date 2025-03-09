import { createRoot } from 'react-dom/client'

import LinkButton from './LinkButton'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<LinkButton>LinkButton</LinkButton>)
    root.unmount()
})
