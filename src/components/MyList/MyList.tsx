/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"

type MyListProps = {
    items: {
        body: string
        heading: string
        icon?: string
    }[]
}

const getIconName = (icon?: string) => {
    let iconResult;
    switch(icon) {
        case 'checkmark':
            iconResult = '✅';
            break;
        case 'cross':
            iconResult = '❌';
            break;
        default:
            iconResult = '🔶';
    }
    return iconResult;
}

const getDisplayForBody = (heading?: string) => heading ? 'block': 'inline';

const MyList = ({ items }: MyListProps) => {
    return (
        <ul sx={{ pl: 10 }}>
            {items.map((item, i) => (
                <li key={i} sx={{ listStyle: `none` }}>
                    <div sx={{ display: `inline`, fontWeight: `bold`, mr: 10 }}>{ getIconName(item.icon) }</div>
                    <div sx={{ display: `inline`, fontSize: [1, 1, 2]}}>
                        <strong>{item.heading}</strong>
                    </div>
                    <div sx={{ display: getDisplayForBody(item.heading), fontSize: [1, 1, 18], pl: 20 }}>
                        {item.body}
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default MyList;