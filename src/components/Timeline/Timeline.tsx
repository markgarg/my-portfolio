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
        <div className="timeline" sx={{
            minHeight: [`700px`, `400px`],
            m: 0,
            fontFamily: "'Droid Sans', sans-serif",
            position: `relative`,
            '&:before': {
                content: "''",
                position: `absolute`,
                left: `50%`,
                top: `0px`,
                bottom: `0px`,
                transform: `translateX(-50%)`,
                width: `4px`,
                backgroundColor: `#fff`,
            },
        }}>
            <div className="entries" sx={{
                width: `calc(100% - 80px)`,
                maxWidth: `800px`,
                margin: `auto`,
                position: `relative`,
                left: `-5px`,
            }}>
                {items.map((item, index) => (
                    <div className="entry" key={index} sx={{
                        width: `calc(50% - 80px)`,
                        float: `left`,
                        padding: `20px`,
                        clear: `both`,
                        textAlign: `right`,
                        "&:not(:first-child)": {
                            marginTop: `-30px`,
                        },
                        "&:nth-child(2n)": {
                            textAlign: `left`,
                            float: `right`,
                            ".title": {
                                "&:before": {
                                    left: `-103px`,
                                },
                                "&.big:before": {
                                    transform: `translate(-8px,-50%)`,
                                },
                            },
                        },
                    }}>
                        <div className="title" sx={{
                            fontSize: `32px`,
                            mb: `12px`,
                            position: `relative`,
                            color: `#fff`,
                            "&:before": {
                                content: '""',
                                position: `absolute`,
                                width: `8px`,
                                height: `8px`,
                                border: `4px solid #ffffff`,
                                backgroundColor: `#1D1D1D`,
                                borderRadius: `100%`,
                                top: `50%`,
                                transform: `translateY(-50%)`,
                                right: `-113px`,
                                zIndex: `1000`,
                                "&:nth-child(2n)": {
                                    left: `-103px`,
                                },
                            },
                            "&.big:before": {
                                width: `24px`,
                                height: `24px`,
                                transform: `translate(8px,-50%)`,
                                "&:nth-child(2n)": {
                                    transform: `translate(-8px,-50%)`,
                                },
                            },
                            "&:nth-child(2n)": {
                                "&:before": {
                                    left: `-63px`,
                                },
                                "&.big:before": {
                                    transform: `translate(-8px,-50%)`,
                                },
                            }
                        }}>{item.title}</div>
                        <div className="body" sx={{
                            color: `#aaa`,
                        }}>
                            <p sx={{
                                lineHeight: `1.4em`,
                            }}>{item.body}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    )
}

export default Timeline;