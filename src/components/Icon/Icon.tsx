import React from 'react';

interface IconProps {
    name: string;
    fill: string;
    icon: {
        viewBox?: string;
        path?: string;
    };
}

const Icon = ({ name, fill, icon }: IconProps) => (
    <svg viewBox={icon.viewBox} width="100%" height="100%" fill={fill}>
        <title>{name}</title>
        <path d={icon.path} />
    </svg>
);

export default Icon;