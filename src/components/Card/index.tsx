import './styles.css'

export interface CardProps {
    flipped?: boolean
    back: string
    id: string
    handleClick?: (id: string) => void
}

const Card = ({ flipped = false, back, handleClick, id }: CardProps) => {
    const cardContentClassNames = ['card__content'];
    flipped && cardContentClassNames.push('card__content--flipped')
    const handleClickFn = (id: string) => {
        if (handleClick){
            handleClick(id)
        }
    }

    return <div className="card" onClick={() =>handleClickFn(id)}>
        <div className={cardContentClassNames.join(' ')}>
            <div className="card__face card__face--front">?</div>
            <div className="card__face card__face--back">{back}</div>
        </div>
    </div>
}

export default Card