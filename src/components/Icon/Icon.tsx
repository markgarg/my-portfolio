import React from 'react';

interface IconProps {
    name: string;
    fill: string;
    icon: {
        viewBox?: string;
        path?: string;
    };
    /** 
     * Whether this icon is decorative (aria-hidden) or informative 
     * @default false - icon is informative and accessible to screen readers
     */
    decorative?: boolean;
    /** 
     * Custom aria-label to override the default name 
     */
    ariaLabel?: string;
    /** 
     * Additional CSS class for styling 
     */
    className?: string;
}

const Icon = ({ 
    name, 
    fill, 
    icon, 
    decorative = false, 
    ariaLabel, 
    className 
}: IconProps) => {
    const titleId = `icon-title-${name.toLowerCase().replace(/\s+/g, '-')}`;
    
    return (
        <svg 
            viewBox={icon.viewBox} 
            width="100%" 
            height="100%" 
            fill={fill}
            role={decorative ? undefined : "img"}
            aria-hidden={decorative ? "true" : undefined}
            aria-labelledby={decorative ? undefined : titleId}
            aria-label={decorative ? undefined : (ariaLabel || `${name} icon`)}
            className={className}
            focusable="false" // Prevents SVG from being focusable in IE
        >
            {!decorative && <title id={titleId}>{ariaLabel || name}</title>}
            <path d={icon.path} />
        </svg>
    );
};

export default Icon;