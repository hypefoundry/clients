import { useEffect, useRef } from 'react'

// ─── Theme ───
export const SERIF = '"Bespoke Serif", "Source Serif 4", Georgia, serif'
export const SERIF_BODY = '"Source Serif 4", "Bespoke Serif", Georgia, serif'
export const SANS = '"Hanken Grotesk", "Inter", system-ui, sans-serif'
export const CURSIVE = '"Caveat", cursive'
export const INK = '#1a1814'
export const INK_SOFT = '#5b554a'
export const INK_MUTED = '#8a8373'
export const BG = '#ffffff'
export const BG_SOFT = '#f4eedc'
export const BG_PAPER = '#faf6ea'
export const YELLOW = '#f6c544'
export const YELLOW_HOVER = '#e3b338'
export const BORDER = '#e7e2d4'
export const BORDER_SOFT = '#efe9d8'
export const DARK = '#0b0b0b'
export const DARK_SOFT = '#141414'
export const DARK_MUTED = 'rgba(255,255,255,0.62)'
export const DARK_EYEBROW = '#c97b62'

// ─── Reveal ───
function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('edt-revealed')
          obs.unobserve(el)
        }
      },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

export function Reveal({ children, className = '', delay = 0 }) {
  const ref = useReveal()
  return (
    <div
      ref={ref}
      className={`edt-reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}

// Margin scribble
export function NotThis({ children, note = 'nope' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-drawn')
          obs.unobserve(el)
        }
      },
      { threshold: 0.6, rootMargin: '0px 0px -38% 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <span ref={ref} className="edt-notthis">
      <span className="edt-notthis-word">{children}</span>
      <span className="edt-notthis-note" aria-hidden="true">{note}</span>
    </span>
  )
}

// Animated highlighter
export function Highlight({ children }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-drawn')
          obs.unobserve(el)
        }
      },
      { threshold: 0.5, rootMargin: '0px 0px -30% 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return <span ref={ref} className="edt-highlight">{children}</span>
}

// ─── Buttons ───
export function YellowButton({ children, href = '#offer', size = 'default', className = '' }) {
  const sizes = {
    default: 'px-8 py-3.5 text-[15px]',
    large: 'px-10 py-4 text-[17px]',
  }
  return (
    <a
      href={href}
      className={`inline-block font-semibold tracking-[-0.005em] transition-colors hover:opacity-95 active:scale-[0.99] ${sizes[size]} ${className}`}
      style={{ background: YELLOW, color: INK, fontFamily: SANS, borderRadius: 999 }}
      onMouseEnter={(e) => (e.currentTarget.style.background = YELLOW_HOVER)}
      onMouseLeave={(e) => (e.currentTarget.style.background = YELLOW)}
    >
      {children}
    </a>
  )
}

export function GhostLink({ children, href = '#', className = '' }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-1.5 text-[13px] font-medium tracking-[0.04em] uppercase transition-colors hover:opacity-70 ${className}`}
      style={{ color: INK, fontFamily: SANS, borderBottom: `1px solid ${INK}`, paddingBottom: 2 }}
    >
      {children}
    </a>
  )
}

// ─── Pill ───
export function Pill({ children, variant = 'light', className = '' }) {
  const styles =
    variant === 'dark'
      ? { background: 'transparent', border: `1px solid rgba(255,255,255,0.22)`, color: '#fff' }
      : { background: BG_SOFT, border: `1px solid ${BORDER}`, color: INK }
  return (
    <span
      className={`inline-block px-3 py-[5px] text-[11.5px] font-semibold tracking-[0.1em] uppercase ${className}`}
      style={{ ...styles, borderRadius: 999, fontFamily: SANS }}
    >
      {children}
    </span>
  )
}

// ─── Ornament (engraved flourish) ───
export function Ornament({ color = INK, className = '' }) {
  return (
    <svg
      viewBox="0 0 320 60"
      width="220"
      height="40"
      className={className}
      aria-hidden="true"
      style={{ display: 'block' }}
    >
      <g stroke={color} strokeWidth="0.7" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.65">
        <path d="M 160 22 L 167 30 L 160 38 L 153 30 Z" />
        <circle cx="160" cy="30" r="1.2" fill={color} />
        <line x1="105" y1="30" x2="146" y2="30" />
        <line x1="174" y1="30" x2="215" y2="30" />
        <path d="M 105 30 c -8 -7, -22 -7, -30 0 c 8 7, 22 7, 30 0" />
        <path d="M 215 30 c 8 -7, 22 -7, 30 0 c -8 7, -22 7, -30 0" />
        <path d="M 75 30 c -6 -4, -16 -2, -22 -7" />
        <path d="M 75 30 c -6 4, -16 2, -22 7" />
        <path d="M 245 30 c 6 -4, 16 -2, 22 -7" />
        <path d="M 245 30 c 6 4, 16 2, 22 7" />
        <circle cx="53" cy="23" r="0.9" fill={color} />
        <circle cx="53" cy="37" r="0.9" fill={color} />
        <circle cx="267" cy="23" r="0.9" fill={color} />
        <circle cx="267" cy="37" r="0.9" fill={color} />
        <circle cx="105" cy="30" r="1" fill={color} />
        <circle cx="215" cy="30" r="1" fill={color} />
      </g>
    </svg>
  )
}

// ─── Wordmarks ───
export function Wordmark({ variant = 'light' }) {
  const isDark = variant === 'dark'
  const color = isDark ? '#fff' : INK
  const chipBg = isDark ? '#fff' : INK
  const starColor = YELLOW
  return (
    <div className="inline-flex items-center gap-2.5">
      <svg width={22} height={22} viewBox="0 0 28 28" aria-hidden="true">
        <rect x="2" y="2" width="24" height="24" rx="2" fill={chipBg} />
        <path
          d="M14 7.5 L15.6 12.4 L20.5 14 L15.6 15.6 L14 20.5 L12.4 15.6 L7.5 14 L12.4 12.4 Z"
          fill={starColor}
        />
      </svg>
      <span
        className="block text-[10px] font-bold tracking-[0.2em] uppercase leading-[1.15]"
        style={{ color, fontFamily: SANS }}
      >
        Brand<br />Foundry<br />Studio
      </span>
    </div>
  )
}

// ───────────── BLOCKS ─────────────

// Editorial top masthead — thin rule, wordmark, category, issue/date
export function Masthead({ category = 'Founder’s Guide', issue = 'No. 01', date = '' }) {
  return (
    <header
      className="w-full"
      style={{ background: BG, borderBottom: `1px solid ${BORDER}` }}
    >
      <div
        className="max-w-[1240px] mx-auto px-6 md:px-10 py-4 flex items-center justify-between gap-6"
      >
        <div className="flex items-center gap-4">
          <Wordmark />
        </div>
        <div
          className="hidden sm:flex items-center gap-5 text-[11px] font-semibold tracking-[0.16em] uppercase"
          style={{ color: INK_SOFT, fontFamily: SANS }}
        >
          <span>{category}</span>
          <span style={{ width: 1, height: 12, background: BORDER }} aria-hidden="true" />
          <span>{issue}</span>
          {date && (
            <>
              <span style={{ width: 1, height: 12, background: BORDER }} aria-hidden="true" />
              <span>{date}</span>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

// Article header — eyebrow, headline, dek, byline row
export function ArticleHeader({ eyebrow, headline, dek, byline }) {
  return (
    <header className="pt-20 md:pt-28 pb-10 md:pb-14" style={{ background: BG }}>
      <div className="max-w-[960px] mx-auto px-6 md:px-10">
        <Reveal>
          {eyebrow && (
            <p
              className="text-[12px] font-semibold tracking-[0.18em] uppercase"
              style={{ color: DARK_EYEBROW, fontFamily: SANS }}
            >
              {eyebrow}
            </p>
          )}
          <h1
            className="mt-5 font-medium tracking-[-0.018em]"
            style={{
              fontFamily: SERIF,
              fontSize: 'clamp(2.4rem, 5.4vw, 4.6rem)',
              lineHeight: 1.05,
              color: INK,
              maxWidth: '18ch',
            }}
          >
            {headline}
          </h1>
          {dek && (
            <p
              className="mt-7 text-[19px] md:text-[22px] leading-[1.45]"
              style={{
                color: INK_SOFT,
                fontFamily: SERIF_BODY,
                fontStyle: 'italic',
                maxWidth: '48ch',
              }}
            >
              {dek}
            </p>
          )}
        </Reveal>

        {byline && (
          <Reveal delay={120}>
            <div
              className="mt-12 md:mt-14 pt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] font-semibold tracking-[0.14em] uppercase"
              style={{ color: INK_SOFT, fontFamily: SANS, borderTop: `1px solid ${BORDER}` }}
            >
              {byline.map((item, i) => (
                <span key={i} className="flex items-center gap-5">
                  {i > 0 && <span style={{ width: 14, height: 1, background: BORDER }} aria-hidden="true" />}
                  <span>{item}</span>
                </span>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </header>
  )
}

// Ornament divider
export function Divider({ color = INK, className = '' }) {
  return (
    <div className={`flex justify-center py-10 md:py-14 ${className}`}>
      <Ornament color={color} />
    </div>
  )
}

// Prose block — constrained body width, serif body
export function ProseBlock({ children, dropCap = false, size = 'default' }) {
  const sizes = {
    default: { fontSize: 'clamp(17px, 1.15vw, 19px)', lineHeight: 1.65 },
    lede: { fontSize: 'clamp(19px, 1.35vw, 22px)', lineHeight: 1.6 },
  }
  return (
    <div className="max-w-[960px] mx-auto px-6 md:px-10">
      <Reveal>
        <div
          className={dropCap ? 'edt-prose edt-prose-dropcap' : 'edt-prose'}
          style={{
            color: INK,
            fontFamily: SERIF_BODY,
            maxWidth: '62ch',
            ...sizes[size],
          }}
        >
          {children}
        </div>
      </Reveal>
    </div>
  )
}

// Numbered step — big serif numeral + heading + body, asymmetric layout
export function NumberedStep({ number, title, children, note }) {
  return (
    <section className="py-10 md:py-14" style={{ background: BG }}>
      <div className="max-w-[960px] mx-auto px-6 md:px-10">
        <Reveal>
          <div className="grid md:grid-cols-[auto_1fr] gap-x-10 md:gap-x-14 gap-y-4">
            <div
              className="select-none"
              style={{
                fontFamily: SERIF,
                fontSize: 'clamp(4rem, 7vw, 6.5rem)',
                lineHeight: 0.9,
                color: INK,
                fontStyle: 'italic',
                fontWeight: 400,
                letterSpacing: '-0.03em',
              }}
            >
              {number}
            </div>
            <div style={{ maxWidth: '60ch' }}>
              <h2
                className="font-medium tracking-[-0.012em]"
                style={{
                  fontFamily: SERIF,
                  fontSize: 'clamp(1.6rem, 2.6vw, 2.15rem)',
                  lineHeight: 1.15,
                  color: INK,
                  marginTop: '0.4em',
                }}
              >
                {title}
              </h2>
              {note && (
                <p
                  className="mt-3 text-[14px]"
                  style={{
                    color: INK_MUTED,
                    fontFamily: SERIF_BODY,
                    fontStyle: 'italic',
                  }}
                >
                  {note}
                </p>
              )}
              <div
                className="edt-prose mt-6 space-y-5"
                style={{
                  color: INK,
                  fontFamily: SERIF_BODY,
                  fontSize: 'clamp(17px, 1.15vw, 19px)',
                  lineHeight: 1.65,
                }}
              >
                {children}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// Pull quote — large italic serif, flanked by hairline rules
export function PullQuote({ children, attribution }) {
  return (
    <figure className="py-16 md:py-20" style={{ background: BG }}>
      <div className="max-w-[820px] mx-auto px-6 md:px-10">
        <Reveal>
          <div
            style={{
              borderTop: `1px solid ${BORDER}`,
              borderBottom: `1px solid ${BORDER}`,
              padding: 'clamp(2rem, 4vw, 3.2rem) 0',
            }}
          >
            <blockquote
              className="font-medium tracking-[-0.012em]"
              style={{
                fontFamily: SERIF,
                fontStyle: 'italic',
                fontSize: 'clamp(1.6rem, 3.6vw, 2.6rem)',
                lineHeight: 1.18,
                color: INK,
                margin: 0,
                maxWidth: '28ch',
              }}
            >
              {children}
            </blockquote>
            {attribution && (
              <figcaption
                className="mt-6 text-[12px] font-semibold tracking-[0.14em] uppercase"
                style={{ color: INK_MUTED, fontFamily: SANS }}
              >
                — {attribution}
              </figcaption>
            )}
          </div>
        </Reveal>
      </div>
    </figure>
  )
}

// Dark emphasis break — single beat of hard-truth atmosphere
export function DarkBreak({ eyebrow, children }) {
  return (
    <section
      className="py-24 md:py-32"
      style={{ background: DARK, color: '#fff' }}
    >
      <div className="max-w-[960px] mx-auto px-6 md:px-10">
        <Reveal>
          {eyebrow && (
            <p
              className="text-[12px] font-semibold tracking-[0.18em] uppercase"
              style={{ color: YELLOW, fontFamily: SANS }}
            >
              {eyebrow}
            </p>
          )}
          <div
            className="mt-6 font-medium tracking-[-0.012em]"
            style={{
              fontFamily: SERIF,
              fontStyle: 'italic',
              fontSize: 'clamp(1.8rem, 3.8vw, 2.9rem)',
              lineHeight: 1.2,
              color: '#fff',
              maxWidth: '32ch',
            }}
          >
            {children}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// Inline offer card — magazine-style "from our studio" callout, tucks into article flow
export function OfferCard({ eyebrow = 'From the studio', title, body, cta = 'Learn more', href = '#offer' }) {
  return (
    <aside className="py-14 md:py-16" style={{ background: BG }}>
      <div className="max-w-[960px] mx-auto px-6 md:px-10">
        <Reveal>
          <div
            className="relative"
            style={{
              background: BG_SOFT,
              border: `1px solid ${BORDER}`,
              borderRadius: 2,
              padding: 'clamp(1.75rem, 3.5vw, 2.8rem)',
              maxWidth: '720px',
              marginInline: 'auto',
            }}
          >
            <p
              className="text-[11px] font-semibold tracking-[0.22em] uppercase"
              style={{ color: INK_MUTED, fontFamily: SANS }}
            >
              {eyebrow}
            </p>
            <h3
              className="mt-4 font-medium tracking-[-0.012em]"
              style={{
                fontFamily: SERIF,
                fontSize: 'clamp(1.5rem, 2.6vw, 2rem)',
                lineHeight: 1.15,
                color: INK,
                maxWidth: '22ch',
              }}
            >
              {title}
            </h3>
            <p
              className="mt-4 text-[16px] md:text-[17px] leading-[1.6]"
              style={{ color: INK_SOFT, fontFamily: SERIF_BODY, maxWidth: '52ch' }}
            >
              {body}
            </p>
            <div className="mt-7">
              <YellowButton href={href}>{cta}</YellowButton>
            </div>
          </div>
        </Reveal>
      </div>
    </aside>
  )
}

// End-of-article block — larger CTA, positioned as the piece's closing argument
export function EndOfArticle({ kicker, headline, body, cta, href = '#offer' }) {
  return (
    <section className="py-24 md:py-32" style={{ background: BG_SOFT }} id="offer">
      <div className="max-w-[900px] mx-auto px-6 md:px-10 text-center">
        <Reveal>
          {kicker && (
            <p
              className="text-[12px] font-semibold tracking-[0.18em] uppercase"
              style={{ color: DARK_EYEBROW, fontFamily: SANS }}
            >
              {kicker}
            </p>
          )}
          <h2
            className="mt-5 font-medium tracking-[-0.014em] mx-auto"
            style={{
              fontFamily: SERIF,
              fontSize: 'clamp(2rem, 4.4vw, 3.4rem)',
              lineHeight: 1.08,
              color: INK,
              maxWidth: '20ch',
            }}
          >
            {headline}
          </h2>
          {body && (
            <p
              className="mt-7 mx-auto text-[17px] md:text-[19px] leading-[1.55]"
              style={{ color: INK_SOFT, fontFamily: SERIF_BODY, maxWidth: '56ch' }}
            >
              {body}
            </p>
          )}
          <div className="mt-10">
            <YellowButton size="large" href={href}>{cta}</YellowButton>
          </div>
          <div className="mt-10 flex justify-center">
            <Ornament />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// Article footer — small print, next reads, wordmark
export function ArticleFooter({ nextReads = [] }) {
  return (
    <footer
      className="py-14 md:py-16"
      style={{ background: BG, borderTop: `1px solid ${BORDER}` }}
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 grid md:grid-cols-[1fr_auto] gap-y-10 gap-x-10 items-start">
        <div>
          <Wordmark />
          <p
            className="mt-4 text-[13px] leading-[1.55] max-w-[34ch]"
            style={{ color: INK_SOFT, fontFamily: SANS }}
          >
            Diagnosis before design. Strategy before pixels. Clarity before anything else.
          </p>
        </div>
        {nextReads.length > 0 && (
          <div className="md:text-right">
            <p
              className="text-[11px] font-semibold tracking-[0.22em] uppercase"
              style={{ color: INK_MUTED, fontFamily: SANS }}
            >
              Next in this series
            </p>
            <ul className="mt-3 space-y-2">
              {nextReads.map((r, i) => (
                <li key={i}>
                  <a
                    href={r.href}
                    className="text-[15px] transition-colors hover:opacity-70"
                    style={{ color: INK, fontFamily: SERIF_BODY, fontStyle: 'italic' }}
                  >
                    {r.title} →
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </footer>
  )
}

// ─── Global styles (inject once per page) ───
export function EditorialStyles() {
  return (
    <style>{`
      .edt-reveal {
        opacity: 0;
        transform: translateY(16px);
        transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
                    transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
      }
      .edt-revealed { opacity: 1; transform: translateY(0); }
      [data-figma-capture="true"] .edt-reveal {
        opacity: 1 !important;
        transform: none !important;
        transition: none !important;
      }

      .edt-prose p { margin: 0; }
      .edt-prose p + p { margin-top: 1.25em; }
      .edt-prose strong { font-weight: 600; }
      .edt-prose em { font-style: italic; }
      .edt-prose ul {
        list-style: none;
        padding: 0;
        margin: 1.25em 0 0;
      }
      .edt-prose ul li {
        position: relative;
        padding-left: 1.5em;
        margin-top: 0.55em;
      }
      .edt-prose ul li::before {
        content: '';
        position: absolute;
        left: 0.15em;
        top: 0.72em;
        width: 0.5em;
        height: 1px;
        background: ${INK};
        opacity: 0.55;
      }

      .edt-prose-dropcap > p:first-of-type::first-letter {
        font-family: ${SERIF};
        font-weight: 500;
        float: left;
        font-size: 4.6em;
        line-height: 0.88;
        padding: 0.08em 0.08em 0 0;
        color: ${INK};
      }

      .edt-highlight {
        color: ${INK};
        padding: 0.05em 3px;
        background-repeat: no-repeat, no-repeat;
        background-position: 0 84%, 0 66%;
        background-size: 0% 48%, 0% 68%;
        background-image:
          linear-gradient(100deg, rgba(246,197,68,0) 0%, rgba(246,197,68,0.82) 3%, rgba(246,197,68,0.96) 50%, rgba(246,197,68,0.82) 97%, rgba(246,197,68,0) 100%),
          linear-gradient(97deg, rgba(246,197,68,0) 0%, rgba(246,197,68,0.42) 5%, rgba(246,197,68,0.55) 95%, rgba(246,197,68,0) 100%);
        -webkit-box-decoration-break: clone;
        box-decoration-break: clone;
        transition: background-size 1000ms cubic-bezier(0.3, 0.82, 0.4, 1);
        will-change: background-size;
      }
      .edt-highlight.is-drawn { background-size: 100% 48%, 100% 68%; }
      [data-figma-capture="true"] .edt-highlight {
        background-size: 100% 48%, 100% 68% !important;
        transition: none !important;
      }
      @media (prefers-reduced-motion: reduce) {
        .edt-highlight { transition: none; }
      }

      .edt-notthis { position: relative; display: inline; white-space: nowrap; }
      .edt-notthis-note {
        font-family: ${CURSIVE};
        font-weight: 600;
        color: ${INK};
        font-size: 0.62em;
        line-height: 1;
        margin-left: 0.32em;
        display: inline-block;
        transform: translateY(-0.1em) rotate(-7deg);
        opacity: 0;
        transition: opacity 480ms ease-out, transform 540ms cubic-bezier(0.32, 0.9, 0.38, 1);
        pointer-events: none;
      }
      .edt-notthis.is-drawn .edt-notthis-note {
        opacity: 0.82;
        transform: translateY(-0.35em) rotate(-7deg);
      }
      [data-figma-capture="true"] .edt-notthis-note {
        opacity: 0.82 !important;
        transform: translateY(-0.35em) rotate(-7deg) !important;
        transition: none !important;
      }
      @media (prefers-reduced-motion: reduce) {
        .edt-notthis-note { transition: none; }
      }

      body { background: ${BG}; }
    `}</style>
  )
}

// Page shell — wraps an article with the global styles and base body styling
export function EditorialPage({ children }) {
  return (
    <div style={{ background: BG, minHeight: '100vh', fontFamily: SANS, color: INK }}>
      <EditorialStyles />
      {children}
    </div>
  )
}
