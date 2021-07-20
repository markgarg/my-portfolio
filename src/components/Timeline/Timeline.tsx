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
            minHeight: [`1500px`, `650px`],
            mx: 0,
            mb: 0,
            mt: [`10px`, `30px`],
            position: `relative`,
            '&:before': {
                content: "''",
                position: `absolute`,
                left: `50%`,
                top: `0px`,
                bottom: `0px`,
                transform: `translateX(-50%)`,
                width: `4px`,
                backgroundColor: `secondary`,
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
                        width: [`50%`, `calc(50% - 80px)`],
                        float: `left`,
                        px: `20px`,
                        pl: [0, `20px`],
                        pr: [`15px`, `20px`],
                        clear: `both`,
                        textAlign: `right`,
                        "&:not(:first-of-type)": {
                            marginTop: [0, `-30px`],
                        },
                        "&:nth-of-type(2n)": {
                            textAlign: `left`,
                            float: `right`,
                            pr: [0, `20px`],
                            pl: [`20px`, `20px`],
                            ".title": {
                                "&:before": {
                                    left: [`-23px`, `-103px`],
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
                            color: `primary`,
                            "&:before": {
                                content: '""',
                                position: `absolute`,
                                width: `8px`,
                                height: `8px`,
                                borderWidth: `4px`,
                                borderStyle: `solid`,
                                borderColor: `secondary`,
                                backgroundColor: `background`,
                                borderRadius: `100%`,
                                top: `50%`,
                                transform: `translateY(-50%)`,
                                right: [`-28px`, `-113px`],
                                zIndex: `1000`,
                            },
                            "&.big:before": {
                                width: `24px`,
                                height: `24px`,
                                transform: `translate(8px,-50%)`,
                            },
                        }}>{item.title}</div>
                        <div className="body" sx={{
                            color: `text`,
                            mt: `-20px`,
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