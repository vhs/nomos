import { createRootRouteWithContext } from '@tanstack/react-router'

import NotFoundComponent from '@/components/05-materials/NotFoundComponent/NotFoundComponent.lazy'
import RootComponent from '@/components/05-materials/RootComponent/RootComponent.lazy'
import type { AuthenticationContextProps } from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider.types'

interface RouterContext {
    auth?: AuthenticationContextProps
}

export const Route = createRootRouteWithContext<RouterContext>()({
    component: RootComponent,
    notFoundComponent: NotFoundComponent
})
