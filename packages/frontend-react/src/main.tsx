import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'
import './main.css'

import App from '@/components/08-app/App/App'

let container = document.getElementById('app')

if (container == null) {
    const bodyElement = document.getElementsByName('BODY')[0]
    container = document.createElement('div')
    container.id = 'app'
    bodyElement.appendChild(container)
}

createRoot(container).render(
    <StrictMode>
        <App />
    </StrictMode>
)
