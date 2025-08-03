import React from 'react';

interface Props {
    plainText: string;
    highlightText: string;
    className?: string; // Optional className prop
}

export const SectionHeader: React.FC<Props> = ({ plainText, highlightText, className }) => {
    return (
        <h2 className={`text-[22px] md:text-[35px] text-center ${className}`}>
            {plainText}{""} <span className='highlight px-4 ml-1 whitespace-nowrap'>{highlightText}</span>
        </h2>
    );
};