import React, { useState } from 'react'

export default function EntitySelector({
    className = '',
    style = {
        height: '105px',
        overflowY: 'auto'
    },
    entities = null,
    onSelect = null,
    emptyLabel = '...'
}) {
    const [selectedEntity, setSelectedEntity] = useState(null);

    const handleSelect = (entity) => {
        setSelectedEntity(entity);
        onSelect(entity);
    };

    if (entities && onSelect && entities.length > 0) {
        return (
            <div style={style}>
                <ul>
                    {entities.map((entity) => (
                        <li
                            key={entity.id}
                            onClick={() => handleSelect(entity)}
                            style={{
                                backgroundColor: selectedEntity === entity ? 'red' : 'rgb(31,41,55)',
                                cursor: 'pointer'
                            }}
                            className={selectedEntity === entity ? 'selected' : ''}
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
