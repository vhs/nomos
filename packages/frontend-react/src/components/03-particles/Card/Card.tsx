import type { CardComponent } from './Card.types'

import Body from './CardBody/CardBody'
import Container from './CardContainer/CardContainer'
import Footer from './CardFooter/CardFooter'
import Header from './CardHeader/CardHeader'

const Card = structuredClone(Container)
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
Card.prototype.Body = Body
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
Card.prototype.Footer = Footer
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
Card.prototype.Header = Header

export default Card as CardComponent

export { Body, Container, Footer, Header }
