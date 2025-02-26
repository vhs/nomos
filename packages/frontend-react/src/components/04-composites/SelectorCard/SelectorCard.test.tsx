import { createRoot } from 'react-dom/client'

import SelectorCard from './SelectorCard'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<SelectorCard id={'test'} mode={'radio'} options={{ test1: 'test1', test2: 'test2' }} title={'test'} />)
    root.unmount()
})
