import { useState } from 'react'
import _ from 'lodash'
import allCards from '../data/all-cards'
import type { CardCollection } from '../react-app-env'
import { VscDebugRestart } from 'react-icons/vsc'

const svgCardDisplay = 'cursor-grab h-20 w-20 p-2 border-solid border-2 border-black rounded'
const svgCardCovered =
    'cursor-grab h-20 w-20 p-2 border-solid border-2 border-black rounded bg-slate-400'

const Board = () => {
    const [shuffleCards, setShuffleCards] = useState<boolean>(true)
    const [theCards, setTheCards] = useState<CardCollection>()
    const [cardsUp, setCardsUp] = useState<string[]>([])
    const [discovered, setDiscovered] = useState<string[]>([])

    if (shuffleCards === true) {
        setTheCards([..._.shuffle(allCards), ..._.shuffle(allCards)])
        setCardsUp([])
        setDiscovered([])
        setShuffleCards(false)
    }

    const triggerCheckCard = (id: number, cardName: string) => {
        const tmpCardName = `${id}-${cardName}`
        const tmpCardsUp = [...cardsUp, tmpCardName]
        if (tmpCardsUp.length === 3) {
            setCardsUp([])
        } else {
            if (!cardsUp.includes(tmpCardName)) {
                setCardsUp(tmpCardsUp)
            }
            if (tmpCardsUp.length === 2) {
                if (
                    tmpCardsUp[0].slice(-cardName.length) === tmpCardsUp[1].slice(-cardName.length)
                ) {
                    console.log({ tmpCardsUp })
                    console.log({ cardName })
                    setDiscovered([...discovered, cardName])
                    setCardsUp([])
                }
            }
        }
    }

    return (
        <section className='m-8'>
            <div className='grid grid-cols-1 gap-4 justify-items-center'>
                <VscDebugRestart
                    className='h-16 w-16 cursor-pointer'
                    onClick={() => setShuffleCards(true)}
                />
                <div className='grid grid-cols-6 gap-6 justify-items-center'>
                    {theCards &&
                        theCards.map((card, index) => {
                            if (
                                cardsUp.includes(`${index}-${card.name}`) ||
                                discovered.includes(card.name)
                            ) {
                                return (
                                    <img
                                        key={index}
                                        className={svgCardDisplay}
                                        src={card.image}
                                        onClick={() => setCardsUp([])}
                                    />
                                )
                            }
                            return (
                                <div
                                    key={index}
                                    className={svgCardCovered}
                                    onClick={() => triggerCheckCard(index, card.name)}
                                ></div>
                            )
                        })}
                </div>
            </div>
        </section>
    )
}

export default Board
