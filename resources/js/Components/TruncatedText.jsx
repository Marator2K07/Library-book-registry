import { DEFAULT_MAX_TEXT_LENGTH_RATIO } from '@/constants'
import React, { useEffect, useState } from 'react'

export default function TruncatedText({
    className = '',
    text = '',
    length = DEFAULT_MAX_TEXT_LENGTH_RATIO
}) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Обновляем ширину окна при изменении размера окна
    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const truncate = () => {
        if (text.length > windowWidth / length) {
            return text.substring(0, windowWidth / length) + "...";
        }
        return text;
    }

    return (
        <div className={className}>
            <p>{truncate()}</p>
        </div>
    )
}
