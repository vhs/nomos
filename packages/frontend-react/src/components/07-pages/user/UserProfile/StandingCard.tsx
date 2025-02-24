import type { FC, ReactNode } from 'react'

import type { StandingCardProps } from './UserProfile.types'

import FontAwesomeIcon from '@/components/01-atoms/FontAwesomeIcon/FontAwesomeIcon'
import type { IconProp } from '@/components/01-atoms/FontAwesomeIcon/FontAwesomeIcon.types'
import Card from '@/components/04-composites/Card/Card'

type StyleKeys = 'default' | 'expired' | 'valid'
interface StyleItem {
    card: string
    footer: string
    icon: IconProp
    text: ReactNode
}

type Styles = Record<StyleKeys, StyleItem>

const styles: Styles = {
    default: {
        card: 'gray-card',
        footer: 'gray-card-footer justify-start',
        icon: 'truck-loading',
        text: 'Loading'
    },
    expired: {
        card: 'red-card',
        footer: 'red-card-footer justify-start',
        icon: 'thumbs-down',
        text: (
            <>
                <span className='huge'>Expired!</span>
                <p>Please visit the membership page to update your subscription!</p>
            </>
        )
    },
    valid: {
        card: 'green-card',
        footer: 'green-card-footer justify-start',
        icon: 'thumbs-up',
        text: (
            <>
                <span className='huge'>Current!</span>
                <p>Your account is in good standing! Thank you!</p>
            </>
        )
    }
}

const StandingCard: FC<StandingCardProps> = ({ standing }) => {
    let styleName: StyleKeys = 'default'
    if (standing != null) styleName = standing ? 'valid' : 'expired'

    const cardStyle = styles[styleName].card
    const footerStyle = styles[styleName].footer
    const icon = styles[styleName].icon
    const text = styles[styleName].text

    return (
        <Card className={cardStyle}>
            <Card.Body>
                <FontAwesomeIcon icon={icon} size='5x' />
                &nbsp;
                {text}
            </Card.Body>
            <Card.Footer className={footerStyle}>
                <a href='http://vanhack.ca/wp/membership/'>http://vanhack.ca/wp/membership/</a>
            </Card.Footer>
        </Card>
    )
}

export default StandingCard
