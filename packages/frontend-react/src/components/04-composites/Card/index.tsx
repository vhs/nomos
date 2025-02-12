import type { CardComponent } from './Card.types'

import Body from './CardBody/CardBody'
import Container from './CardContainer/CardContainer'
import Footer from './CardFooter/CardFooter'
import Header from './CardHeader/CardHeader'

// @ts-expect-error Property 'Header' does not exist on type 'FC<CardContainerProps>'.
Container.Body = Body
// @ts-expect-error Property 'Header' does not exist on type 'FC<CardContainerProps>'.
Container.Footer = Footer
// @ts-expect-error Property 'Header' does not exist on type 'FC<CardContainerProps>'.
Container.Header = Header

export default Container as CardComponent

export { Body, Container, Footer, Header }
