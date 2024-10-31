import React, { useEffect, useState } from 'react'

export default function EntitySelector({
    className = '',
    style = {
        height: '105px',
        overflowY: 'auto'
    },
    initEntity = null,
    entities = null,
    onSelect = null,
    emptyLabel = '...'
}) {
    const [selectedEntity, setSelectedEntity] = useState(null);

    const handleSelect = (entity) => {
        setSelectedEntity(entity);
        onSelect(entity);
    };

    // выбираем элемент при инициализации (если он есть)
    useEffect(() => {
        if (initEntity) {
            setSelectedEntity(initEntity);
        }
    }, []);

    if (entities && onSelect && entities.length > 0) {
        return (
            <div style={style}>
                <ul>
                    {entities.map((entity) => (
                        <li
                            key={entity.id}
                            onClick={() => handleSelect(entity)}
                            style={{
                                backgroundColor:
                                    selectedEntity && selectedEntity.id === entity.id
                                        ? 'red'
                                        : 'rgb(31,41,55)',
                                cursor: 'pointer'
                            }}
                            className={
                                selectedEntity && selectedEntity === entity
                                    ? 'selected'
                                    : ''
                            }
                        >
                            {entity.name}
                        </li>
                    ))}
                </ul>
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
