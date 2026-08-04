/** @jsx jsx */
import { jsx } from "theme-ui"
import { useState } from "react"

type TimelineItem = {
    period: string
    role: string
    company: string
    location?: string
    summary: string
    description?: string
    highlights?: string[]
    tech?: string[]
}

type TimelineProps = {
    items: TimelineItem[]
}

const Timeline = ({ items }: TimelineProps) => {
    const [open, setOpen] = useState<Record<number, boolean>>({})
    const toggle = (i: number) => setOpen((s) => ({ ...s, [i]: !s[i] }))

    return (
        <section
            className="timeline"
            role="list"
            aria-label="Career timeline showing professional journey"
            sx={{
                position: `relative`,
                maxWidth: `820px`,
                mx: `auto`,
                mt: [`16px`, `30px`],
                "&:before": {
                    content: '""',
                    position: `absolute`,
                    left: `50%`,
                    top: 0,
                    bottom: 0,
                    width: `3px`,
                    transform: `translateX(-50%)`,
                    background: `linear-gradient(var(--theme-ui-colors-primary), var(--theme-ui-colors-divide))`,
                },
                "&:after": { content: '""', display: `table`, clear: `both` },
                "@media (max-width: 760px)": {
                    "&:before": { left: `7px`, transform: `none` },
                },
            }}
        >
            {items.map((item, index) => {
                const isOpen = !!open[index]
                return (
                    <article
                        className={`entry${isOpen ? ` is-open` : ``}`}
                        key={index}
                        role="listitem"
                        aria-labelledby={`timeline-title-${index}`}
                        aria-describedby={`timeline-detail-${index}`}
                        aria-expanded={isOpen}
                        tabIndex={0}
                        onClick={() => toggle(index)}
                        onKeyDown={(e) => {
                            if (e.key === `Enter` || e.key === ` `) {
                                e.preventDefault()
                                toggle(index)
                            }
                        }}
                        sx={{
                            position: `relative`,
                            width: `50%`,
                            px: `40px`,
                            py: `14px`,
                            clear: `both`,
                            outline: `none`,
                            "&:nth-of-type(odd)": { float: `left`, textAlign: `right` },
                            "&:nth-of-type(even)": { float: `right`, textAlign: `left` },
                            "&:nth-of-type(odd) .tl-dot": { right: `-7px` },
                            "&:nth-of-type(even) .tl-dot": { left: `-7px` },
                            "&:focus-visible": {
                                outline: `2px solid`,
                                outlineColor: `primary`,
                                outlineOffset: `2px`,
                                borderRadius: `12px`,
                            },
                            "&:hover .tl-card, &:focus-within .tl-card, &.is-open .tl-card": {
                                transform: `translateY(-4px)`,
                                boxShadow: `0 12px 30px rgba(0,0,0,0.14)`,
                                borderColor: `primary`,
                            },
                            "&:hover .tl-detail, &:focus-within .tl-detail, &.is-open .tl-detail": {
                                maxHeight: `1000px`,
                                opacity: 1,
                                mt: `12px`,
                                pt: `12px`,
                                borderTopColor: `divide`,
                            },
                            "@media (max-width: 760px)": {
                                width: `100%`,
                                float: `none`,
                                textAlign: `left`,
                                pl: `34px`,
                                pr: 0,
                                "& .tl-dot": { left: `0px`, right: `auto` },
                            },
                        }}
                    >
                        <span
                            className="tl-dot"
                            aria-hidden="true"
                            sx={{
                                position: `absolute`,
                                top: `26px`,
                                width: `14px`,
                                height: `14px`,
                                borderRadius: `50%`,
                                backgroundColor: `background`,
                                border: `3px solid`,
                                borderColor: `primary`,
                                zIndex: 2,
                            }}
                        />
                        <div
                            className="tl-card"
                            sx={{
                                textAlign: `left`,
                                backgroundColor: `background`,
                                border: `1px solid`,
                                borderColor: `divide`,
                                borderRadius: `12px`,
                                p: `16px 18px`,
                                boxShadow: `0 1px 2px rgba(0,0,0,0.10)`,
                                cursor: `pointer`,
                                transition: `transform .25s ease, box-shadow .25s ease, border-color .25s ease`,
                            }}
                        >
                            <span
                                className="tl-period"
                                sx={{
                                    display: `inline-block`,
                                    fontSize: `13px`,
                                    fontWeight: 700,
                                    letterSpacing: `0.04em`,
                                    textTransform: `uppercase`,
                                    color: `primary`,
                                }}
                            >
                                {item.period}
                            </span>
                            <h3
                                id={`timeline-title-${index}`}
                                className="title"
                                sx={{
                                    color: `heading`,
                                    fontWeight: 700,
                                    fontSize: `21px`,
                                    lineHeight: 1.3,
                                    mt: `4px`,
                                    mb: 0,
                                }}
                            >
                                {item.role}
                            </h3>
                            <div sx={{ color: `secondary`, fontSize: `16px`, mt: `2px` }}>
                                {item.company}
                            </div>
                            <p sx={{ color: `text`, fontSize: `20px`, lineHeight: 1.55, mt: `10px`, mb: 0 }}>
                                {item.summary}
                            </p>

                            <div
                                id={`timeline-detail-${index}`}
                                className="tl-detail"
                                sx={{
                                    maxHeight: 0,
                                    overflow: `hidden`,
                                    opacity: 0,
                                    mt: 0,
                                    borderTop: `1px dashed transparent`,
                                    transition: `max-height .35s ease, opacity .3s ease, margin .3s ease, padding .3s ease`,
                                }}
                            >
                                {item.description && (
                                    <p sx={{ color: `text`, fontSize: `18px`, lineHeight: 1.55, m: `0 0 10px` }}>
                                        {item.description}
                                    </p>
                                )}
                                {item.highlights && item.highlights.length > 0 && (
                                    <ul sx={{ m: `0 0 12px`, pl: `20px` }}>
                                        {item.highlights.map((h, i) => (
                                            <li key={i} sx={{ color: `text`, fontSize: `18px`, lineHeight: 1.55, m: `6px 0` }}>
                                                {h}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                {item.tech && item.tech.length > 0 && (
                                    <div>
                                        {item.tech.map((t, i) => (
                                            <span
                                                key={i}
                                                sx={{
                                                    display: `inline-block`,
                                                    bg: `muted`,
                                                    color: `primary`,
                                                    fontSize: `13px`,
                                                    fontWeight: 600,
                                                    px: `10px`,
                                                    py: `4px`,
                                                    borderRadius: `999px`,
                                                    mr: `6px`,
                                                    mb: `6px`,
                                                }}
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                {item.location && (
                                    <div sx={{ color: `secondary`, fontSize: `14px`, mt: `4px` }}>
                                        📍 {item.location}
                                    </div>
                                )}
                            </div>
                        </div>
                    </article>
                )
            })}
        </section>
    )
}

export default Timeline;