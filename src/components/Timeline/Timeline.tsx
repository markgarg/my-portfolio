/** @jsx jsx */
import { jsx } from "theme-ui"
import { keyframes } from "@emotion/react"
import { useState } from "react"

const pulseRing = keyframes`
    0% {
        transform: translateX(-50%) scale(1);
        opacity: 0.65;
    }
    75% {
        transform: translateX(-50%) scale(2.4);
        opacity: 0;
    }
    100% {
        transform: translateX(-50%) scale(2.4);
        opacity: 0;
    }
`

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

const itemHasDetails = (item: TimelineItem): boolean =>
    Boolean(
        item.description ||
        (item.highlights && item.highlights.length > 0) ||
        (item.tech && item.tech.length > 0)
    )

const Timeline = ({ items }: TimelineProps) => {
    // Expand the most recent role by default so visitors see key impact immediately
    const [open, setOpen] = useState<Record<number, boolean>>({ 0: true })

    const expandableIndices = items
        .map((item, idx) => (itemHasDetails(item) ? idx : -1))
        .filter((idx) => idx !== -1)

    const allExpanded =
        expandableIndices.length > 0 && expandableIndices.every((idx) => !!open[idx])

    const toggle = (i: number) => setOpen((s) => ({ ...s, [i]: !s[i] }))

    const toggleAll = () => {
        if (allExpanded) {
            setOpen({})
        } else {
            const nextState: Record<number, boolean> = {}
            expandableIndices.forEach((idx) => {
                nextState[idx] = true
            })
            setOpen(nextState)
        }
    }

    return (
        <div sx={{ maxWidth: `920px`, mx: `auto`, mt: [`16px`, `24px`] }}>
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Kalam:wght@700&display=swap"
            />
            <div
                sx={{
                    display: `flex`,
                    flexWrap: `wrap`,
                    justifyContent: `space-between`,
                    alignItems: `center`,
                    gap: `8px`,
                    mb: `12px`,
                    px: [`4px`, 0],
                }}
            >
                <span sx={{ color: `secondary`, fontSize: [`13px`, `14px`] }}>
                    Tap any role to view achievements and tech stack
                </span>
                <button
                    type="button"
                    onClick={toggleAll}
                    aria-label={allExpanded ? "Collapse all timeline entries" : "Expand all timeline entries"}
                    sx={{
                        background: `transparent`,
                        border: `1px solid`,
                        borderColor: `divide`,
                        borderRadius: `6px`,
                        color: `primary`,
                        fontSize: `13px`,
                        fontWeight: 600,
                        px: `12px`,
                        py: `6px`,
                        whiteSpace: `nowrap`,
                        flexShrink: 0,
                        cursor: `pointer`,
                        transition: `background-color .2s ease, border-color .2s ease`,
                        "&:hover": {
                            borderColor: `primary`,
                            bg: `muted`,
                        },
                        "&:focus-visible": {
                            outline: `2px solid`,
                            outlineColor: `primary`,
                            outlineOffset: `2px`,
                        },
                    }}
                >
                    {allExpanded ? `Collapse all` : `Expand all`}
                </button>
            </div>

            <section
                className="timeline"
                aria-label="Career timeline showing professional journey"
                sx={{
                    position: `relative`,
                    "&:before": {
                        content: '""',
                        position: `absolute`,
                        left: [`92px`, `190px`],
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
                        const hasDetails = itemHasDetails(item)
                        const isOpen = hasDetails && !!open[index]
                        const isCurrentRole = index === 0 || /present/i.test(item.period)
                        const detailId = `timeline-detail-${index}`
                        const titleId = `timeline-title-${index}`

                        return (
                            <li
                                key={index}
                                role="listitem"
                                className={`entry${isOpen ? ` is-open` : ``}`}
                                tabIndex={hasDetails ? 0 : undefined}
                                aria-expanded={hasDetails ? isOpen : undefined}
                                aria-controls={hasDetails ? detailId : undefined}
                                onClick={hasDetails ? () => toggle(index) : undefined}
                                onKeyDown={
                                    hasDetails
                                        ? (e) => {
                                              if (e.key === `Enter` || e.key === ` `) {
                                                  e.preventDefault()
                                                  toggle(index)
                                              }
                                          }
                                        : undefined
                                }
                                sx={{
                                    position: `relative`,
                                    display: `grid`,
                                    gridTemplateColumns: [`76px 1fr`, `164px 1fr`],
                                    columnGap: [`32px`, `52px`],
                                    alignItems: `start`,
                                    width: `100%`,
                                    boxSizing: `border-box`,
                                    py: [`10px`, `14px`],
                                    outline: `none`,
                                    cursor: hasDetails ? `pointer` : `default`,
                                    WebkitTapHighlightColor: `transparent`,
                                    "&:focus-visible": {
                                        outline: `none`,
                                    },
                                    "&:focus-visible .tl-card": {
                                        outline: `2px solid`,
                                        outlineColor: `primary`,
                                        outlineOffset: `2px`,
                                    },
                                }}
                            >
                                {/* Left column: Years / Period */}
                                <div
                                    className="tl-period"
                                    sx={{
                                        textAlign: `right`,
                                        pt: [`18px`, `24px`],
                                        pr: [`4px`, `8px`],
                                        fontFamily: `'Kalam', cursive`,
                                        fontSize: [`15px`, `19px`],
                                        fontWeight: 700,
                                        lineHeight: 1.2,
                                        letterSpacing: `0.02em`,
                                        color: `primary`,
                                        wordBreak: `break-word`,
                                        transform: `rotate(-20deg)`,
                                        transformOrigin: `right center`,
                                    }}
                                >
                                    {item.period}
                                </div>

                                {/* Center timeline dot */}
                                {isCurrentRole && (
                                    <span
                                        className="tl-dot-pulse"
                                        aria-hidden="true"
                                        sx={{
                                            position: `absolute`,
                                            top: [`26px`, `34px`],
                                            left: [`92px`, `190px`],
                                            transform: `translateX(-50%)`,
                                            width: [`14px`, `16px`],
                                            height: [`14px`, `16px`],
                                            boxSizing: `border-box`,
                                            borderRadius: `50%`,
                                            backgroundColor: `primary`,
                                            pointerEvents: `none`,
                                            zIndex: 1,
                                            animation: `${pulseRing} 2s cubic-bezier(0, 0, 0.2, 1) infinite`,
                                        }}
                                    />
                                )}
                                <span
                                    className="tl-dot"
                                    aria-hidden="true"
                                    sx={{
                                        position: `absolute`,
                                        top: [`26px`, `34px`],
                                        left: [`92px`, `190px`],
                                        transform: `translateX(-50%)`,
                                        width: [`14px`, `16px`],
                                        height: [`14px`, `16px`],
                                        boxSizing: `border-box`,
                                        borderRadius: `50%`,
                                        backgroundColor: isCurrentRole || isOpen ? `primary` : `background`,
                                        border: `3px solid`,
                                        borderColor: `primary`,
                                        zIndex: 2,
                                        transition: `background-color .2s ease`,
                                    }}
                                />

                                {/* Right column: Role & Details Card */}
                                <div
                                    className="tl-card"
                                    sx={{
                                        textAlign: `left`,
                                        backgroundColor: `background`,
                                        border: `1px solid`,
                                        borderColor: isOpen ? `primary` : `divide`,
                                        borderRadius: `12px`,
                                        p: [`14px`, `16px 18px`],
                                        boxShadow: isOpen
                                            ? `0 8px 24px rgba(0,0,0,0.12)`
                                            : `0 1px 2px rgba(0,0,0,0.10)`,
                                        transition: `box-shadow .2s ease, border-color .2s ease`,
                                        "@media (hover: hover)": {
                                            "&:hover": {
                                                boxShadow: hasDetails
                                                    ? `0 8px 24px rgba(0,0,0,0.12)`
                                                    : `0 1px 2px rgba(0,0,0,0.10)`,
                                                borderColor: hasDetails ? `primary` : `divide`,
                                            },
                                        },
                                    }}
                                >
                                    <div
                                        sx={{
                                            display: `flex`,
                                            alignItems: `flex-start`,
                                            justifyContent: `space-between`,
                                            gap: `8px`,
                                        }}
                                    >
                                        <h3
                                            id={titleId}
                                            className="title"
                                            sx={{
                                                color: `heading`,
                                                fontWeight: 700,
                                                fontSize: [`17px`, `21px`],
                                                lineHeight: 1.3,
                                                m: 0,
                                            }}
                                        >
                                            {item.role}
                                        </h3>
                                        {hasDetails && (
                                            <span
                                                className="tl-chevron"
                                                aria-hidden="true"
                                                sx={{
                                                    display: `inline-flex`,
                                                    alignItems: `center`,
                                                    justifyContent: `center`,
                                                    flexShrink: 0,
                                                    mt: `4px`,
                                                    color: isOpen ? `primary` : `secondary`,
                                                    transform: isOpen ? `rotate(180deg)` : `rotate(0deg)`,
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
                                    <div
                                        sx={{
                                            display: `flex`,
                                            flexWrap: `wrap`,
                                            alignItems: `center`,
                                            gap: `6px`,
                                            color: `secondary`,
                                            fontSize: [`14px`, `16px`],
                                            mt: `4px`,
                                        }}
                                    >
                                        <span>{item.company}</span>
                                        {item.location && (
                                            <span sx={{ fontSize: [`13px`, `14px`], opacity: 0.85 }}>
                                                • 📍 {item.location}
                                            </span>
                                        )}
                                    </div>
                                    {item.summary && (
                                        <p
                                            sx={{
                                                color: `text`,
                                                fontSize: [`15px`, `19px`],
                                                lineHeight: 1.55,
                                                mt: `10px`,
                                                mb: 0,
                                            }}
                                        >
                                            {item.summary}
                                        </p>
                                    )}

                                    {hasDetails && isOpen && (
                                        <div
                                            id={detailId}
                                            className="tl-detail"
                                            sx={{
                                                mt: `14px`,
                                                pt: `14px`,
                                                borderTop: `1px dashed`,
                                                borderTopColor: `divide`,
                                            }}
                                        >
                                            {item.description && (
                                                <p
                                                    sx={{
                                                        color: `text`,
                                                        fontSize: [`15px`, `18px`],
                                                        lineHeight: 1.55,
                                                        m: `0 0 10px`,
                                                    }}
                                                >
                                                    {item.description}
                                                </p>
                                            )}
                                            {item.highlights && item.highlights.length > 0 && (
                                                <ul sx={{ m: `0 0 12px`, pl: [`18px`, `20px`] }}>
                                                    {item.highlights.map((h, i) => (
                                                        <li
                                                            key={i}
                                                            sx={{
                                                                color: `text`,
                                                                fontSize: [`15px`, `18px`],
                                                                lineHeight: 1.55,
                                                                m: `6px 0`,
                                                            }}
                                                        >
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
                                                                fontSize: [`12px`, `13px`],
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
                                        </div>
                                    )}
                                </div>
                            </li>
                        )
                    })}
                </ol>
            </section>
        </div>
    )
}

export default Timeline
