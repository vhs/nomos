import type { CardComponent } from './Card.types'

import Body from './CardBody/CardBody'
import Container from './CardContainer/CardContainer'
import Footer from './CardFooter/CardFooter'
import Header from './CardHeader/CardHeader'

// @ts-expect-error Property 'Container' does not exist on type 'FC<ModalContainerProps>'.
Container.Body = Body
// @ts-expect-error Property 'Container' does not exist on type 'FC<ModalContainerProps>'.
Container.Container = Container
// @ts-expect-error Property 'Container' does not exist on type 'FC<ModalContainerProps>'.
Container.Footer = Footer
// @ts-expect-error Property 'Container' does not exist on type 'FC<ModalContainerProps>'.
Container.Header = Header

export default Container as CardComponent

export { Body, Container, Footer, Header }
