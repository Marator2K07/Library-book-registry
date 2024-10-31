import React, { useEffect, useState } from 'react'

export default function EntityMultiSelector({
    className = '',
    initEntities = null,
    entities = null,
    onSelect = null,
    emptyLabel = '...'
}) {
    const [selectedEntities, setSelectedEntities] = useState([]);

    const handleEntity = (entity) => {
        setSelectedEntities(prevEntities => {
            if (prevEntities.includes(entity)) {
                return prevEntities.filter(id => id !== entity);
            } else {
                return [...prevEntities, entity];
            }
        });
        onSelect(entity);
    };

    // выбираем элементы при инициализации (если они есть)
    useEffect(() => {
        if (initEntities) {
            setSelectedEntities(initEntities);
        }
    }, []);

    if (entities && onSelect && entities.length > 0) {
        return (
            <div style={{
                height: '105px',
                overflowY: 'auto'
            }}>
                <ul>
                    {entities.map((entity) => (
                        <li
                            key={entity.id}
                            style={{
                                backgroundColor: selectedEntities.includes(entity.id) ? 'red' : 'rgb(31,41,55)',
                                cursor: 'pointer',
                            }}
                            onClick={() => handleEntity(entity.id)}
                        >
                            {entity.name}
                        </li>
                    ))}
                </ul>
            </div>
        );
    } else {
        return (
            <div className={className}>
                <p>{emptyLabel}</p>
            </div>
        )
    }
};

