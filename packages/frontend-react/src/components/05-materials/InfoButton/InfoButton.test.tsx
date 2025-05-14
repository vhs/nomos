import { createRoot } from 'react-dom/client'

import InfoButton from './InfoButton'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<InfoButton />)
    root.unmount()
})
