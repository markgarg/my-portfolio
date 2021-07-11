// @flow strict

import React from 'react';

type IconProps = {
    name: string
    size: string
    icon: {
        viewBox?: string
        path?: string
    }
}

const Icon = ({ name, size, icon }: IconProps) => (
    <svg viewBox={icon.viewBox} width={size} height={size}>
        <title>{name}</title>
        <path d={icon.path} />
    </svg>
);

export default Icon;