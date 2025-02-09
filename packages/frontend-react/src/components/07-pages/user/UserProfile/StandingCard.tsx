import type { FC } from 'react'

import type { StandingCardProps } from './UserProfile.types'

import FontAwesomeIcon from '@/components/01-atoms/FontAwesomeIcon/FontAwesomeIcon'
import Card from '@/components/04-composites/Card'

const StandingCard: FC<StandingCardProps> = ({ standing }) => {
    if (standing === true)
        return (
            <Card className='green-card'>
                <Card.Body>
                    <FontAwesomeIcon icon={'thumbs-up'} size='5x' />
                    <span className='huge'>Current!</span>
                    <p>Your account is in good standing! Thank you!</p>
                </Card.Body>
            </Card>
        )

    if (standing === false)
        return (
            <Card className='red-card'>
                <Card.Body>
                    <FontAwesomeIcon icon={'thumbs-down'} size='5x' />
                    <span className='huge'>Expired!</span>
                    <p>Please visit the membership page to update your subscription!</p>
                </Card.Body>
                <Card.Footer className='red-card-footer'>
                    <a href='http://vanhack.ca/wp/membership/'>http://vanhack.ca/wp/membership/</a>
                </Card.Footer>
            </Card>
        )

    return (
        <Card className='gray-card'>
            <Card.Body>
                <FontAwesomeIcon icon={'truck-loading'} size='5x' />
                <span className='huge'>Loading</span>
                <p>Loading!</p>
            </Card.Body>
            <Card.Footer className='gray-card-footer'>
                <a href='http://vanhack.ca/wp/membership/'>http://vanhack.ca/wp/membership/</a>
            </Card.Footer>
        </Card>
    )
}

export default StandingCard
