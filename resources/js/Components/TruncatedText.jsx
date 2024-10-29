import { DEFAULT_MAX_TEXT_LENGTH } from '@/constants'
import React from 'react'

export default function TruncatedText({
    className = '',
    text = '',
    length = DEFAULT_MAX_TEXT_LENGTH
}) {

    const truncate = () => {
        if (text.length > length) {
            return text.substring(0, length) + "...";
        }
        return text;
    }

    return (
        <div className={className}>
            <p>{truncate()}</p>
        </div>
    )
}
