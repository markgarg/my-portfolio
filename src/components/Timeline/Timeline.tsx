/** @jsx jsx */
import { jsx } from "theme-ui"

type TimelineProps = {
    items: {
        title: string,
        body: string,
    }[],
}

const Timeline = ({ items }: TimelineProps) => {
    return (
        <div className="entries">
            {items.map((item, index) => (
                <div className="entry" key={index}>
                    <div className="title">{item.title}</div>
                    <div className="body">
                        <p>{item.body}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Timeline;