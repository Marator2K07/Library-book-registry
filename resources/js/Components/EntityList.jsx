import React, { useState } from 'react'

export default function EntityList({
    className = 'flex',
    entities = [],
    emptyLabel = '...'
}) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // навигация по коллекции
    const nextGenre = () => {
        if (currentIndex < entities.length) {
            setCurrentIndex(currentIndex + 1);
        }
    }
    const prevGenre = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    }

    if (entities) {
        return (
            <div className={className}>
                <div>
                    {entities[currentIndex].name}
                </div>
                <button onClick={prevGenre} hidden={currentIndex === 0}>
                    &#8593; {/* Стрелка вверх */}
                </button>
                <button onClick={nextGenre} hidden={currentIndex === entities.length - 1}>
                    &#8595; {/* Стрелка вниз */}
                </button>
            </div>
        )
    } else {
        return (
            <div className={className}>
                <p>{emptyLabel}</p>
            </div>
        )
    }
}
