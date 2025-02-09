import { createRoot } from 'react-dom/client'

import OverlayCard from './OverlayCard'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<OverlayCard title={'OverlayCard'}>OverlayCard</OverlayCard>)
    root.unmount()
})
