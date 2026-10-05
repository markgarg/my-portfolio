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
            aria-label="Career timeline showing professional journey"
            sx={{
                position: `relative`,
                maxWidth: `820px`,
                mx: `auto`,
                mt: [`16px`, `30px`],
                "&:before": {
                    content: '""',
                    position: `absolute`,
                    left: [`14px`, `20px`],
                    top: 0,
                    bottom: 0,
                    width: `3px`,
                    transform: `translateX(-50%)`,
                    background: `linear-gradient(var(--theme-ui-colors-primary), var(--theme-ui-colors-divide))`,
                },
            }}
        >
            <ol
                role="list"
                sx={{
                    listStyle: `none`,
                    m: 0,
                    p: 0,
                }}
            >
                {items.map((item, index) => {
                    const isOpen = !!open[index]
                    const detailId = `timeline-detail-${index}`
                    const titleId = `timeline-title-${index}`
                    const hasDetails = Boolean(
                        item.description ||
                        (item.highlights && item.highlights.length > 0) ||
                        (item.tech && item.tech.length > 0) ||
                        item.location
                    )

                    return (
                        <li
                            key={index}
                            role="listitem"
                            className={`entry${isOpen ? ` is-open` : ``}`}
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
                                width: `100%`,
                                pl: [`38px`, `48px`],
                                pr: 0,
                                py: `14px`,
                                outline: `none`,
                                cursor: hasDetails ? `pointer` : `default`,
                                "&:focus-visible": {
                                    outline: `none`,
                                },
                                "&:focus-visible .tl-card": {
                                    outline: `2px solid`,
                                    outlineColor: `primary`,
                                    outlineOffset: `2px`,
                                },
                                "&:hover .tl-card, &:focus-within .tl-card, &.is-open .tl-card": {
                                    transform: `translateY(-3px)`,
                                    boxShadow: `0 12px 30px rgba(0,0,0,0.14)`,
                                    borderColor: `primary`,
                                },
                                "&:hover .tl-dot, &:focus-within .tl-dot, &.is-open .tl-dot": {
                                    backgroundColor: `primary`,
                                },
                                "&:hover .tl-chevron, &:focus-within .tl-chevron, &.is-open .tl-chevron": {
                                    transform: `rotate(180deg)`,
                                    color: `primary`,
                                },
                                "&:hover .tl-detail, &:focus-within .tl-detail, &.is-open .tl-detail": {
                                    maxHeight: `1200px`,
                                    opacity: 1,
                                    mt: `14px`,
                                    pt: `14px`,
                                    borderTopColor: `divide`,
                                },
                                "@media (prefers-reduced-motion: reduce)": {
                                    "&:hover .tl-card, &:focus-within .tl-card, &.is-open .tl-card": {
                                        transform: `none`,
                                    },
                                    "&:hover .tl-chevron, &:focus-within .tl-chevron, &.is-open .tl-chevron": {
                                        transform: `none`,
                                    },
                                    "& .tl-card, & .tl-dot, & .tl-detail, & .tl-chevron": {
                                        transition: `none !important`,
                                    },
                                },
                            }}
                        >
                            <span
                                className="tl-dot"
                                aria-hidden="true"
                                sx={{
                                    position: `absolute`,
                                    top: `26px`,
                                    left: [`14px`, `20px`],
                                    transform: `translateX(-50%)`,
                                    width: `14px`,
                                    height: `14px`,
                                    borderRadius: `50%`,
                                    backgroundColor: `background`,
                                    border: `3px solid`,
                                    borderColor: `primary`,
                                    zIndex: 2,
                                    transition: `background-color .2s ease`,
                                    "@media (prefers-reduced-motion: reduce)": {
                                        transition: `none`,
                                    },
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
                                    transition: `transform .25s ease, box-shadow .25s ease, border-color .25s ease`,
                                    "@media (prefers-reduced-motion: reduce)": {
                                        transition: `none`,
                                    },
                                }}
                            >
                                <div
                                    sx={{
                                        display: `flex`,
                                        alignItems: `flex-start`,
                                        justifyContent: `space-between`,
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
                                    {hasDetails && (
                                        <span
                                            className="tl-chevron"
                                            aria-hidden="true"
                                            sx={{
                                                display: `inline-flex`,
                                                alignItems: `center`,
                                                justifyContent: `center`,
                                                color: `secondary`,
                                                transition: `transform .25s ease, color .2s ease`,
                                            }}
                                        >
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <polyline points="6 9 12 15 18 9" />
                                            </svg>
                                        </span>
                                    )}
                                </div>
                                <h3
                                    id={titleId}
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
                                {item.summary && (
                                    <p sx={{ color: `text`, fontSize: `20px`, lineHeight: 1.55, mt: `10px`, mb: 0 }}>
                                        {item.summary}
                                    </p>
                                )}

                                {hasDetails && (
                                    <div
                                        id={detailId}
                                        className="tl-detail"
                                        sx={{
                                            maxHeight: 0,
                                            overflow: `hidden`,
                                            opacity: 0,
                                            mt: 0,
                                            pt: 0,
                                            borderTop: `1px dashed transparent`,
                                            transition: `max-height .35s ease, opacity .25s ease, margin .3s ease, padding .3s ease, border-color .3s ease`,
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
                                )}
                            </div>
                        </li>
                    )
                })}
            </ol>
        </section>
    )
}

export default Timeline;
