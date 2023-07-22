import { useRef, useState } from "react"
import Card, { CardProps } from "../Card"
import './styles.css'
import { duplicateRegenerateSortArray } from "../../utils/card-ultils"

export interface GridProps {
    cards: CardProps[]
}

const Grid = ( {cards}: GridProps) => {
    const [stateCards, setStateCards] = useState(() => {
        return duplicateRegenerateSortArray(cards);
    });

    const first = useRef<CardProps | null>(null);
    const second = useRef<CardProps | null>(null);
    const unFlip = useRef(false);
    const [matches, setMetches] = useState(0);
    const [moves, setMoves] = useState(0);

    // Reset botão
    const handleReset = () => {
        setStateCards(duplicateRegenerateSortArray(cards));
        first.current = null;
        second.current = null;
        unFlip.current = false;
        setMetches(0);
        setMoves(0);
    }

    const handleClick = (id: string) => {
        const newStateCards = stateCards.map((card) => {

            // Se o id do cartão não for id clicado, não faz nada!!
            if(card.id !== id) return card;

            // Se o cartão já estiver virado, não faz nada!
            if(card.flipped) return(card);

            // Desvira cartas erradas
            if(unFlip.current && first.current && second.current) {
                first.current.flipped = false;
                second.current.flipped = false;
                first.current = null;
                second.current = null;
                unFlip.current = false;
            }

            // Virar o card
            card.flipped = true;

            // Configura primeiro e segundo card clicados
            if(first.current === null) {
                first.current = card;
            } else if( second.current === null) {
                second.current = card;
            }

            // Checar se os 2 cartões virados são iguais
            if(first.current && second.current) {
                if(first.current.back === second.current.back){

                    // A pessoa acertou
                    first.current = null
                    second.current = null
                    setMetches((m) => m + 1);
                } else {
                    // A pessoa Errou
                    unFlip.current = true;
                }

                setMoves((m) => m + 1);
            }

            console.log(card);
            return(card)
        });
        setStateCards(newStateCards);
    }
    return (
        <>
        <div className="header">
            <h1>Jogo Da Memória</h1>
            <p>Jogadas: <span className="moves"> {moves} </span>| Acertos: <span className="matches">{matches}</span> | <button onClick={() => handleReset()}>Reiniciar</button></p>
        </div>
            <div className="grid">
        {stateCards.map(card => {
            return <Card {...card} key={card.id} handleClick={handleClick}/>
        })};
    </div>
        </>
    )
};
export default Grid