import { useState, useEffect, useRef } from 'react'
import './index.css'

// ─── Theme ───
const SERIF = '"Bespoke Serif", "Source Serif 4", "Source Serif Pro", Georgia, serif'
const SANS = '"Hanken Grotesk", "Inter", system-ui, sans-serif'
const INK = '#1a1814'
const INK_SOFT = '#5b554a'
const BG = '#ffffff'
const BG_SOFT = '#f4eedc'
const YELLOW = '#f6c544'
const YELLOW_HOVER = '#e3b338'
const BORDER = '#e7e2d4'
const DARK = '#0b0b0b'
const DARK_SOFT = '#141414'
const DARK_MUTED = 'rgba(255,255,255,0.62)'
const DARK_EYEBROW = '#c97b62'

// ─── Reveal ───
function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('v3-revealed')
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

function Reveal({ children, className = '', delay = 0 }) {
  const ref = useReveal()
  return (
    <div
      ref={ref}
      className={`v3-reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}

// Margin scribble — handwritten rejection note tucked beside a word as it scrolls into view.
function NotThis({ children }) {
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
    <span ref={ref} className="v3-notthis">
      <span className="v3-notthis-word">{children}</span>
      <span className="v3-notthis-note" aria-hidden="true">nope</span>
    </span>
  )
}

// Highlighter — animated marker stroke that draws across text when scrolled into view.
function Highlight({ children }) {
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
      { threshold: 0.5, rootMargin: '0px 0px -38% 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return <span ref={ref} className="v3-highlight">{children}</span>
}

// ─── Buttons ───
function YellowButton({ children, href = '#diagnosis', size = 'default', className = '' }) {
  const sizes = {
    default: 'px-8 py-3.5 text-[15px]',
    large: 'px-10 py-4 text-[17px]',
  }
  return (
    <a
      href={href}
      className={`inline-block font-semibold tracking-[-0.005em] transition-colors hover:opacity-90 active:scale-[0.99] ${sizes[size]} ${className}`}
      style={{ background: YELLOW, color: INK, fontFamily: SANS, borderRadius: 999 }}
      onMouseEnter={(e) => (e.currentTarget.style.background = YELLOW_HOVER)}
      onMouseLeave={(e) => (e.currentTarget.style.background = YELLOW)}
    >
      {children}
    </a>
  )
}

// ─── Pill eyebrow (Black Jays-style category chip) ───
function Pill({ children, className = '' }) {
  return (
    <span
      className={`inline-block px-3 py-[5px] text-[12px] font-medium tracking-[-0.005em] ${className}`}
      style={{
        background: BG_SOFT,
        border: `1px solid ${BORDER}`,
        borderRadius: 999,
        color: INK,
        fontFamily: SANS,
      }}
    >
      {children}
    </span>
  )
}

// ─── Decorative engraved flourish ───
function Ornament({ className = '' }) {
  return (
    <svg
      viewBox="0 0 320 60"
      width="240"
      height="44"
      className={className}
      aria-hidden="true"
      style={{ display: 'block' }}
    >
      <g
        stroke={INK}
        strokeWidth="0.7"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      >
        {/* Center diamond */}
        <path d="M 160 22 L 167 30 L 160 38 L 153 30 Z" />
        <circle cx="160" cy="30" r="1.2" fill={INK} />

        {/* Spine */}
        <line x1="105" y1="30" x2="146" y2="30" />
        <line x1="174" y1="30" x2="215" y2="30" />

        {/* Inner curls */}
        <path d="M 105 30 c -8 -7, -22 -7, -30 0 c 8 7, 22 7, 30 0" />
        <path d="M 215 30 c 8 -7, 22 -7, 30 0 c -8 7, -22 7, -30 0" />

        {/* Outer leaves */}
        <path d="M 75 30 c -6 -4, -16 -2, -22 -7" />
        <path d="M 75 30 c -6 4, -16 2, -22 7" />
        <path d="M 245 30 c 6 -4, 16 -2, 22 -7" />
        <path d="M 245 30 c 6 4, 16 2, 22 7" />

        {/* Endpoint dots */}
        <circle cx="53" cy="23" r="0.9" fill={INK} />
        <circle cx="53" cy="37" r="0.9" fill={INK} />
        <circle cx="267" cy="23" r="0.9" fill={INK} />
        <circle cx="267" cy="37" r="0.9" fill={INK} />
        <circle cx="105" cy="30" r="1" fill={INK} />
        <circle cx="215" cy="30" r="1" fill={INK} />
      </g>
    </svg>
  )
}

// ─── Wordmark (dark-bg variant for top-left corner) ───
function WordmarkDark() {
  return (
    <div className="inline-flex items-center gap-2.5">
      <svg width={24} height={24} viewBox="0 0 28 28" aria-hidden="true">
        <rect x="2" y="2" width="24" height="24" rx="2" fill="#fff" />
        <path
          d="M14 7.5 L15.6 12.4 L20.5 14 L15.6 15.6 L14 20.5 L12.4 15.6 L7.5 14 L12.4 12.4 Z"
          fill={YELLOW}
        />
      </svg>
      <span
        className="block text-[10px] font-bold tracking-[0.2em] uppercase leading-[1.15]"
        style={{ color: '#fff', fontFamily: SANS }}
      >
        Brand<br />Foundry<br />Studio
      </span>
    </div>
  )
}

// ─── Hero (dark, BMA-style) ───
function Hero() {
  const [playing, setPlaying] = useState(false)
  return (
    <section className="relative" style={{ background: DARK }}>
      {/* Top bar: centered wordmark */}
      <div className="relative max-w-[1240px] mx-auto px-6 md:px-10 pt-6 md:pt-7 flex justify-center">
        <WordmarkDark />
      </div>

      <div className="relative max-w-[1240px] mx-auto px-6 md:px-10 pt-10 md:pt-14 pb-16 md:pb-20 text-center">
        <Reveal>
          <p
            className="text-[12px] md:text-[13px] font-semibold tracking-[0.12em] uppercase"
            style={{ color: YELLOW, fontFamily: SANS }}
          >
            For founders weighing another rebrand — before they spend another dollar.
          </p>

          <h1
            className="mt-6 font-medium tracking-[-0.018em] mx-auto"
            style={{
              fontFamily: SERIF,
              fontSize: 'clamp(2.2rem, 5vw, 4.2rem)',
              lineHeight: 1.06,
              color: '#fff',
            }}
          >
            Find what's actually broken across<br />your brand, messaging &amp; website.
          </h1>

          <p
            className="mt-7 mx-auto text-[18px] md:text-[21px] leading-[1.5]"
            style={{ color: DARK_MUTED, fontFamily: SANS, maxWidth: '72ch' }}
          >
            A focused, one-session diagnosis from a designer with 15+ years of experience. No retainers. No bloated proposals. Just the answer to "what should I actually fix first?"
          </p>

          <div className="mt-9 md:mt-10">
            <YellowButton size="large">Apply for a Diagnosis</YellowButton>
            <p
              className="mt-4 text-[12px]"
              style={{ color: 'rgba(255,255,255,0.5)', fontFamily: SANS }}
            >
              Brand Diagnosis · By application · Every application reviewed personally
            </p>
          </div>
        </Reveal>

        <Reveal delay={120} className="mt-12 md:mt-16">
          <div
            className="relative aspect-video max-w-[900px] mx-auto overflow-hidden"
            style={{ background: DARK_SOFT, borderRadius: 4, boxShadow: '0 30px 80px -30px rgba(0,0,0,0.6)' }}
          >
            {!playing ? (
              <button
                onClick={() => setPlaying(true)}
                className="absolute inset-0 w-full h-full flex items-center justify-center cursor-pointer border-0 bg-transparent group"
                aria-label="Play video"
              >
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.0) 40%, rgba(0,0,0,0.5) 100%)' }}
                />
                <div
                  className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{ background: YELLOW, borderRadius: 999 }}
                >
                  <svg width="22" height="26" viewBox="0 0 22 26" fill="none" className="ml-1">
                    <path d="M22 13L0 26V0L22 13Z" fill={INK} />
                  </svg>
                </div>
              </button>
            ) : (
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0"
                title="Brand Foundry"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── Let's be honest (dark transitional section — BMA-style) ───
function LetsBeHonest() {
  return (
    <section className="pt-16 md:pt-24 pb-24 md:pb-32" style={{ background: BG }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <Reveal>
          <h2
            className="text-center font-medium tracking-[-0.012em]"
            style={{
              fontFamily: SERIF,
              fontSize: 'clamp(1.15rem, 4.6vw, 2.9rem)',
              lineHeight: 1.15,
              color: INK,
              fontStyle: 'italic',
              whiteSpace: 'nowrap',
            }}
          >
            Is another rebrand actually the answer?
          </h2>
        </Reveal>

        <Reveal>
          <div
            className="mt-12 md:mt-14 max-w-[620px] mx-auto text-left space-y-5 text-[17px] md:text-[19px] leading-[1.55]"
            style={{ color: INK_SOFT, fontFamily: SANS }}
          >
            <p>You've been told to refresh the brand.</p>
            <p>You've been told to <NotThis>rewrite</NotThis> the site.</p>
            <p>You've been told a <NotThis>new logo</NotThis> will fix it.</p>
            <p>So you did. You hired the studio. You approved the visuals. You shipped the new site.</p>
            <p>And what happened?</p>
            <p>A few compliments from other designers. A polite nod from your team. And the same leads trickling in, the same messaging drifting, the same feeling that something still isn't landing.</p>
            <p>
              What I've found, is that redesigning isn't the problem.{' '}
              <Highlight>you haven't diagnosed what's actually broken.</Highlight>
            </p>
            <p>No clarity on positioning. No sharp messaging. No structure guiding the visitor. No path from "landed on your site" to "got in touch."</p>
            <p>That's what a Brand Diagnosis fixes.</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── How it works (3-step horizontal with hand-drawn doodles) ───
function HowItWorks() {
  const steps = [
    { title: 'Submit your business', desc: 'A short form covering your brand, site, audience, and what feels off. Takes 5 minutes.', tilt: '-2deg' },
    { title: 'See what\u2019s actually broken', desc: 'A 30-minute call walking through what we found across brand, messaging, structure, and conversion.', tilt: '1.5deg' },
    { title: 'Walk away with direction', desc: 'A written breakdown, prioritised actions, and clarity on what to fix first.', tilt: '-1deg' },
  ]
  return (
    <section className="pt-12 md:pt-16 pb-20 md:pb-28">
      <div className="max-w-[1080px] mx-auto px-6 md:px-8 text-center">
        <Reveal>
          <Pill className="mb-6">Here&rsquo;s how</Pill>
          <h2 className="font-medium tracking-[-0.012em]" style={{ fontFamily: SERIF, fontSize: 'clamp(1.8rem, 3.6vw, 2.6rem)', lineHeight: 1.15, color: INK }}>
            Start with a diagnosis, not a <NotThis>redesign</NotThis>.
          </h2>
        </Reveal>
        <div className="relative mt-14 md:mt-16 max-w-[920px] mx-auto">
          {/* Subtle hand-drawn connector arrows — desktop only */}
          <svg
            className="hidden lg:block absolute pointer-events-none"
            style={{ top: 48, left: 0, right: 0, height: 20 }}
            viewBox="0 0 920 20"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <g stroke={INK} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.38">
              <path
                d="M 220 10 C 260 2, 320 18, 378 10"
                strokeWidth="1.3"
                strokeDasharray="5 4"
                vectorEffect="non-scaling-stroke"
              />
              <path d="M 370 5 L 384 10 L 370 15" strokeWidth="1.3" vectorEffect="non-scaling-stroke" />
              <path
                d="M 540 10 C 580 2, 640 18, 698 10"
                strokeWidth="1.3"
                strokeDasharray="5 4"
                vectorEffect="non-scaling-stroke"
              />
              <path d="M 690 5 L 704 10 L 690 15" strokeWidth="1.3" vectorEffect="non-scaling-stroke" />
            </g>
          </svg>
          <div className="grid md:grid-cols-3 gap-y-12 gap-x-10 md:gap-x-10">
            {steps.map((s, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="text-center">
                  <div className="flex justify-center" style={{ transform: `rotate(${s.tilt})` }}>
                    <StepDoodle step={i + 1} />
                  </div>
                  <h3
                    className="mt-6 text-[18px] md:text-[19px] font-bold tracking-[-0.008em]"
                    style={{ color: INK, fontFamily: SANS }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="mt-2.5 text-[15px] leading-[1.6] max-w-[280px] mx-auto"
                    style={{ color: INK_SOFT, fontFamily: SANS }}
                  >
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function StepDoodle({ step }) {
  if (step === 1) {
    // Paper plane in flight (Submit)
    return (
      <svg viewBox="0 0 140 110" className="w-[140px] h-[110px]" aria-hidden="true">
        <g stroke={INK} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M 110 50 L 18 28 L 42 56 L 18 78 Z" />
          <path d="M 110 50 L 42 56" />
        </g>
        <g fill={INK}>
          <circle cx="14" cy="86" r="2" />
          <circle cx="6" cy="94" r="2" />
        </g>
        <g stroke={INK} strokeWidth="2.25" strokeLinecap="round">
          <line x1="118" y1="22" x2="128" y2="22" />
          <line x1="123" y1="17" x2="123" y2="27" />
          <line x1="119.5" y1="18.5" x2="126.5" y2="25.5" />
          <line x1="119.5" y1="25.5" x2="126.5" y2="18.5" />
        </g>
      </svg>
    )
  }
  if (step === 2) {
    // Magnifying glass over a marked-up page (Diagnose) — reuses same yellow highlighter vocabulary
    return (
      <svg viewBox="0 0 140 110" className="w-[140px] h-[110px]" aria-hidden="true">
        <g stroke={INK} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M 18 22 L 60 22 L 60 90 L 18 90 Z" />
        </g>
        <g stroke={INK} strokeWidth="2" strokeLinecap="round" fill="none">
          <line x1="26" y1="33" x2="52" y2="33" />
          <line x1="26" y1="42" x2="48" y2="42" />
          <line x1="26" y1="60" x2="52" y2="60" />
          <line x1="26" y1="78" x2="44" y2="78" />
        </g>
        <path
          d="M 24 50 C 32 47, 46 53, 56 49"
          stroke={YELLOW}
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
          opacity="0.9"
        />
        <ellipse cx="38" cy="69" rx="10" ry="4" stroke={YELLOW} strokeWidth="2" fill="none" />
        <g stroke={INK} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="#fff">
          <circle cx="92" cy="58" r="22" />
        </g>
        <line x1="108" y1="74" x2="122" y2="90" stroke={INK} strokeWidth="3.5" strokeLinecap="round" />
        <g stroke={INK} strokeWidth="2.25" strokeLinecap="round">
          <line x1="106" y1="22" x2="116" y2="22" />
          <line x1="111" y1="17" x2="111" y2="27" />
        </g>
      </svg>
    )
  }
  // Signpost with arrow (Direction)
  return (
    <svg viewBox="0 0 140 110" className="w-[140px] h-[110px]" aria-hidden="true">
      <g stroke={INK} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <line x1="56" y1="32" x2="56" y2="92" />
        <path d="M 56 36 L 110 36 L 122 48 L 110 60 L 56 60" />
        <path d="M 56 70 L 32 70 L 22 80 L 32 90 L 56 90" />
        <line x1="38" y1="98" x2="74" y2="98" />
      </g>
      <g fill={INK}>
        <path d="M 102 44 L 108 50 L 102 56 L 96 50 Z" />
      </g>
      <g stroke={INK} strokeWidth="2.25" strokeLinecap="round">
        <line x1="118" y1="20" x2="128" y2="20" />
        <line x1="123" y1="15" x2="123" y2="25" />
        <line x1="119.5" y1="16.5" x2="126.5" y2="23.5" />
        <line x1="119.5" y1="23.5" x2="126.5" y2="16.5" />
      </g>
    </svg>
  )
}

// ─── PainPoints (notebook beat — ported from v1) ───
function PainPoints() {
  const points = [
    { lead: "You've spent money on a site that ", mark: "doesn't convert", trail: "." },
    { lead: "Your messaging ", mark: "changes every time", trail: " someone new touches it." },
    { lead: "You've hired designers, developers, or agencies — and ", mark: "still feel stuck", trail: "." },
    { lead: "Your content gets published but ", mark: "doesn't connect", trail: "." },
    { lead: "You don't know what to fix next, so you ", mark: "fix everything", trail: "." },
  ]

  const notebookLines = {
    backgroundColor: '#fbf6e9',
    backgroundImage:
      'repeating-linear-gradient(180deg, transparent 0px, transparent 41px, rgba(12,12,12,0.16) 41px, rgba(12,12,12,0.16) 42px)',
  }

  return (
    <section className="py-20 md:py-28" style={{ background: BG_SOFT }}>
      <div className="max-w-[860px] mx-auto px-6 md:px-8 text-center">
        <Reveal>
          <Pill className="mb-6">Before you redesign</Pill>
          <h2
            className="font-medium tracking-[-0.012em]"
            style={{
              fontFamily: SERIF,
              fontSize: 'clamp(1.8rem, 3.6vw, 2.6rem)',
              lineHeight: 1.15,
              color: INK,
            }}
          >
            New logo. New site. New visuals.<br />Same problem underneath.
          </h2>
        </Reveal>

        <Reveal>
          <ul className="mt-12 md:mt-14 space-y-6 md:space-y-7 max-w-[680px] mx-auto text-left">
            {points.map(({ lead, mark, trail }, i) => (
              <li
                key={i}
                className="text-[20px] md:text-[23px] leading-[1.4]"
                style={{ color: INK, fontFamily: SANS }}
              >
                {lead}
                <Highlight>{mark}</Highlight>
                {trail}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <div className="mt-16 md:mt-20 flex flex-col items-center">
            <div
              className="relative inline-block px-10 py-10 md:px-16 md:py-14 max-w-[640px]"
              style={{
                ...notebookLines,
                transform: 'rotate(-1.6deg)',
                boxShadow:
                  '0 1px 0 rgba(12,12,12,0.05), 0 26px 56px -28px rgba(12,12,12,0.28), 0 2px 6px -2px rgba(12,12,12,0.08)',
                clipPath:
                  'polygon(0.5% 1%, 99.2% 0.4%, 99.6% 98.6%, 0.8% 99.2%)',
              }}
            >
              <p
                style={{
                  fontFamily: '"Permanent Marker", "Caveat", cursive',
                  fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
                  lineHeight: 1.05,
                  letterSpacing: '0.01em',
                  textTransform: 'uppercase',
                  color: INK,
                }}
              >
                You're guessing.<br />Not diagnosing.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2" aria-hidden="true">
              <svg width="34" height="32" viewBox="0 0 34 32" fill="none">
                <path
                  d="M17 2 C 14 10, 10 18, 6 26 M6 26 L 12 22 M6 26 L 10 30"
                  stroke={INK}
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  opacity="0.75"
                />
              </svg>
              <span
                style={{
                  fontFamily: '"Caveat", cursive',
                  fontSize: '1.4rem',
                  lineHeight: 1,
                  transform: 'rotate(-2deg)',
                  color: INK_SOFT,
                }}
              >
                that's the gap we close
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── Big centered testimonial ───
function PullQuote() {
  return (
    <section className="py-20 md:py-28" style={{ background: BG_SOFT }}>
      <div className="max-w-[920px] mx-auto px-6 md:px-8 text-center">
        <Reveal>
          <p
            className="font-medium tracking-[-0.012em]"
            style={{
              fontFamily: SERIF,
              fontSize: 'clamp(1.6rem, 3.4vw, 2.4rem)',
              lineHeight: 1.25,
              color: INK,
            }}
          >
            "I'd already spent $40k on a rebrand that didn't move the needle. The diagnosis showed me — in one session — that my messaging was the actual problem, not the visuals. Worth ten times the cost."
          </p>
          <p className="mt-8 text-[13px] font-semibold tracking-[0.04em]" style={{ color: INK, fontFamily: SANS }}>
            JESS R. — Founder, B2B SaaS
          </p>
        </Reveal>
      </div>
    </section>
  )
}

// ─── Founder block ───
function Founder() {
  return (
    <section className="pt-20 md:pt-28 pb-14">
      <div className="max-w-[820px] mx-auto px-6 md:px-8 text-center">
        <Reveal>
          <div
            className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-[28px] font-medium"
            style={{ background: BG_SOFT, color: INK, fontFamily: SERIF, border: `1px solid ${BORDER}` }}
          >
            C
          </div>
          <p className="mt-4 text-[15px] font-bold tracking-[-0.005em]" style={{ color: INK, fontFamily: SANS }}>
            Clark Spendelow
          </p>
          <p className="mt-1 text-[13px]" style={{ color: INK_SOFT, fontFamily: SANS }}>
            Founder, Brand Foundry · 15+ years of brand &amp; web design
          </p>
        </Reveal>
      </div>
    </section>
  )
}

// ─── Logo wall ───
function LogoWall() {
  // PLACEHOLDER — replace with real client names from Clark's 15+ year portfolio
  const logos = [
    'Client One', 'Client Two', 'Client Three', 'Client Four', 'Client Five',
    'Client Six', 'Client Seven', 'Client Eight', 'Client Nine', 'Client Ten',
  ]
  return (
    <section className="pb-20 md:pb-28">
      <div className="max-w-[1080px] mx-auto px-6 md:px-8 text-center">
        <Reveal>
          <h2 className="font-medium tracking-[-0.012em]" style={{ fontFamily: SERIF, fontSize: 'clamp(1.8rem, 3.6vw, 2.6rem)', lineHeight: 1.15, color: INK, maxWidth: '22ch', marginInline: 'auto' }}>
            A few brands shaped over 15 years.
          </h2>
          <p className="mt-5 mx-auto text-[16px] leading-[1.55]" style={{ color: INK_SOFT, fontFamily: SANS, maxWidth: '54ch' }}>
            Brand and website work for founders across SaaS, consumer, and professional services. The same eye that built these brands is the eye doing the diagnosis.
          </p>
        </Reveal>
        <Reveal>
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-10 gap-x-6">
            {logos.map((name, i) => (
              <div
                key={i}
                className="flex items-center justify-center text-[15px] font-bold tracking-[-0.01em]"
                style={{ color: INK_SOFT, fontFamily: SANS, opacity: 0.75 }}
              >
                {name}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── What you get (3-col benefits with mini icons) ───
function WhatYouGet() {
  const items = [
    {
      title: 'A diagnosis report',
      desc: "A written breakdown of what's costing you conversions — across brand, messaging, positioning, and site structure.",
      icon: 'doc',
    },
    {
      title: 'Prioritised actions',
      desc: 'Specific, sequenced fixes ranked by impact and effort — so you know exactly what to tackle first, second, and third.',
      icon: 'list',
    },
    {
      title: 'An honest call',
      desc: "An assessment of what's worth fixing — and what isn't. We'll tell you when redesign is the wrong answer.",
      icon: 'chat',
    },
  ]
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-[1080px] mx-auto px-6 md:px-8 text-center">
        <Reveal>
          <Pill className="mb-6">Deliverables</Pill>
          <h2 className="font-medium tracking-[-0.012em]" style={{ fontFamily: SERIF, fontSize: 'clamp(1.8rem, 3.6vw, 2.6rem)', lineHeight: 1.15, color: INK }}>
            Everything you walk away with
          </h2>
        </Reveal>
        <div className="mt-12 md:mt-16 grid md:grid-cols-3 gap-10 md:gap-12 max-w-[940px] mx-auto">
          {items.map((it, i) => (
            <Reveal key={i} delay={i * 80}>
              <BenefitIcon kind={it.icon} />
              <h3 className="mt-4 text-[15px] font-bold tracking-[-0.005em]" style={{ color: INK, fontFamily: SANS }}>
                {it.title}
              </h3>
              <p className="mt-2 text-[14px] leading-[1.55] max-w-[280px] mx-auto" style={{ color: INK_SOFT, fontFamily: SANS }}>
                {it.desc}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function BenefitIcon({ kind }) {
  const stroke = INK
  if (kind === 'doc') {
    return (
      <svg viewBox="0 0 32 32" className="w-7 h-7 mx-auto" aria-hidden="true">
        <g stroke={stroke} strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 8 4 L 21 4 L 26 9 L 26 28 L 8 28 Z" />
          <path d="M 21 4 L 21 9 L 26 9" />
          <line x1="11" y1="14" x2="22" y2="14" />
          <line x1="11" y1="18" x2="22" y2="18" />
          <line x1="11" y1="22" x2="18" y2="22" />
        </g>
      </svg>
    )
  }
  if (kind === 'list') {
    return (
      <svg viewBox="0 0 32 32" className="w-7 h-7 mx-auto" aria-hidden="true">
        <g stroke={stroke} strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <line x1="11" y1="9" x2="26" y2="9" />
          <line x1="11" y1="16" x2="26" y2="16" />
          <line x1="11" y1="23" x2="26" y2="23" />
          <circle cx="6" cy="9" r="1.6" fill={stroke} />
          <circle cx="6" cy="16" r="1.6" fill={stroke} />
          <circle cx="6" cy="23" r="1.6" fill={stroke} />
        </g>
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 32 32" className="w-7 h-7 mx-auto" aria-hidden="true">
      <g stroke={stroke} strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 5 8 L 27 8 L 27 22 L 16 22 L 11 27 L 11 22 L 5 22 Z" />
        <line x1="10" y1="13" x2="22" y2="13" />
        <line x1="10" y1="17" x2="18" y2="17" />
      </g>
    </svg>
  )
}

// ─── Yellow vs Black comparison ───
function Comparison() {
  return (
    <section className="pb-20 md:pb-28">
      <div className="max-w-[1080px] mx-auto px-6 md:px-8">
        <Reveal>
          <h2 className="text-center font-medium tracking-[-0.012em]" style={{ fontFamily: SERIF, fontSize: 'clamp(1.8rem, 3.6vw, 2.6rem)', lineHeight: 1.15, color: INK, maxWidth: '24ch', marginInline: 'auto' }}>
            What changes when you diagnose first.
          </h2>
        </Reveal>
        <div className="mt-12 md:mt-14 grid md:grid-cols-2 gap-5 md:gap-6">
          <Reveal>
            <div className="p-8 md:p-10 h-full" style={{ background: INK, borderRadius: 4 }}>
              <span className="text-[11px] font-bold tracking-[0.18em] uppercase" style={{ color: 'rgba(255,255,255,0.55)', fontFamily: SANS }}>
                Without diagnosis
              </span>
              <h3 className="mt-4 font-medium tracking-[-0.012em]" style={{ fontFamily: SERIF, fontSize: 'clamp(1.5rem, 2.6vw, 2rem)', lineHeight: 1.15, color: '#fff' }}>
                Another rebrand. Same problem.
              </h3>
              <ul className="mt-6 space-y-3 text-[14px] leading-[1.5]" style={{ color: 'rgba(255,255,255,0.78)', fontFamily: SANS }}>
                <li>→ Five-figure rebrand that doesn't move conversion</li>
                <li>→ Messaging that drifts every quarter</li>
                <li>→ Designers and devs solving the wrong problem</li>
                <li>→ Six months of "almost there"</li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="p-8 md:p-10 h-full" style={{ background: YELLOW, borderRadius: 4 }}>
              <span className="text-[11px] font-bold tracking-[0.18em] uppercase" style={{ color: INK, fontFamily: SANS }}>
                With diagnosis
              </span>
              <h3 className="mt-4 font-medium tracking-[-0.012em]" style={{ fontFamily: SERIF, fontSize: 'clamp(1.5rem, 2.6vw, 2rem)', lineHeight: 1.15, color: INK }}>
                You know exactly what to fix.
              </h3>
              <ul className="mt-6 space-y-3 text-[14px] leading-[1.5]" style={{ color: INK, fontFamily: SANS }}>
                <li>→ A clear, prioritised list of what's broken</li>
                <li>→ Confidence that the next dollar is well-spent</li>
                <li>→ Sequenced actions you can execute or delegate</li>
                <li>→ Direction in one session, not six months</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// ─── 6-area diagnosis breakdown (mirrors the BMA "Levels" 2-col) ───
function DiagnosisAreas() {
  const areas = [
    {
      n: 'Area 1',
      title: 'Brand',
      desc: "We start with the foundation: who you are, what you stand for, and whether your visual identity matches the business you're actually running. Many brands look right but feel wrong — we identify the gap.",
    },
    {
      n: 'Area 2',
      title: 'Messaging',
      desc: "What you say, who you say it to, and whether it lands. We pressure-test your value proposition, headlines, and the words your audience actually uses — versus the words on your site right now.",
    },
    {
      n: 'Area 3',
      title: 'Positioning',
      desc: "Where you sit in the market and why someone would pick you over a competitor. We look at the category you're trying to win, your unfair advantage, and whether your positioning is sharp enough to defend.",
    },
    {
      n: 'Area 4',
      title: 'Audience clarity',
      desc: "Who you're for — and just as importantly, who you're not. The fastest way to dilute conversion is to speak to everyone. We map your audience and call out where the focus has slipped.",
    },
    {
      n: 'Area 5',
      title: 'Site structure',
      desc: "How your site is organised, what's in the way of conversion, and where visitors drop off. Information architecture, page hierarchy, and the journey from landing to action — examined end to end.",
    },
    {
      n: 'Area 6',
      title: 'Conversion flow',
      desc: "The mechanics: forms, CTAs, friction points, trust signals, social proof. Where leads leak, why they leak, and what it would take to plug each leak — ranked by potential impact.",
    },
  ]
  return (
    <section className="py-20 md:py-28" style={{ background: BG_SOFT }}>
      <div className="max-w-[1080px] mx-auto px-6 md:px-8">
        <div className="text-center">
          <Reveal>
            <Pill className="mb-6">Method</Pill>
            <h2
              className="font-medium tracking-[-0.012em]"
              style={{ fontFamily: SERIF, fontSize: 'clamp(1.8rem, 3.6vw, 2.6rem)', lineHeight: 1.15, color: INK, maxWidth: '22ch', marginInline: 'auto' }}
            >
              What we examine.
            </h2>
            <p
              className="mt-5 mx-auto text-[16px] leading-[1.6]"
              style={{ color: INK_SOFT, fontFamily: SANS, maxWidth: '58ch' }}
            >
              Six areas, examined in sequence. We don't guess at one piece — we look at the system, then tell you which piece is the bottleneck.
            </p>
          </Reveal>
        </div>
        <div className="mt-14 md:mt-16 grid md:grid-cols-2 gap-x-10 md:gap-x-16 gap-y-10 md:gap-y-14">
          {areas.map((a, i) => (
            <Reveal key={i} delay={(i % 2) * 60}>
              <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 22 }}>
                <p className="text-[12px] font-bold tracking-[0.18em] uppercase" style={{ color: INK_SOFT, fontFamily: SANS }}>
                  {a.n}
                </p>
                <h3 className="mt-2 font-medium tracking-[-0.012em]" style={{ fontFamily: SERIF, fontSize: '1.5rem', lineHeight: 1.15, color: INK }}>
                  {a.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.65]" style={{ color: INK, fontFamily: SANS }}>
                  {a.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ───
function FAQ() {
  const faqs = [
    { q: 'Do I need a full redesign?', a: "Not always. Sometimes small changes fix bigger issues. The diagnosis tells you which it is." },
    { q: 'Is this a sales call?', a: "No. The session is the deliverable. You leave with a written breakdown whether or not you ever work with us again." },
    { q: 'How long does it take?', a: 'A 30-minute call, plus a written report you receive within 48 hours.' },
    { q: 'What happens after?', a: 'You can implement everything yourself, hire your existing team, or work with us on the rebuild. Up to you.' },
  ]
  return (
    <section className="pb-20 md:pb-28">
      <div className="max-w-[760px] mx-auto px-6 md:px-8">
        <Reveal>
          <h2 className="text-center font-medium tracking-[-0.012em]" style={{ fontFamily: SERIF, fontSize: 'clamp(1.8rem, 3.6vw, 2.6rem)', lineHeight: 1.15, color: INK }}>
            Common questions.
          </h2>
        </Reveal>
        <Reveal>
          <div className="mt-12">
            {faqs.map((f, i) => (
              <FAQItem key={i} q={f.q} a={f.a} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  return (
    <div style={{ borderTop: `1px solid ${BORDER}` }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 cursor-pointer border-0 text-left bg-transparent"
        aria-expanded={open}
      >
        <span className="text-[16px] md:text-[17px] font-semibold tracking-[-0.005em]" style={{ color: INK, fontFamily: SANS }}>
          {q}
        </span>
        <span
          className="text-2xl shrink-0 select-none transition-transform duration-300"
          style={{ color: INK, transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
        >
          +
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{ maxHeight: open ? `${ref.current?.scrollHeight || 200}px` : '0px' }}
      >
        <p ref={ref} className="text-[15px] leading-[1.65] pb-6 max-w-[60ch]" style={{ color: INK_SOFT, fontFamily: SANS }}>
          {a}
        </p>
      </div>
    </div>
  )
}

// ─── Final CTA ───
function FinalCTA() {
  return (
    <section className="py-24 md:py-32 text-center" style={{ background: BG_SOFT }} id="diagnosis">
      <div className="max-w-[720px] mx-auto px-6 md:px-8">
        <Reveal>
          <div className="flex justify-center mb-8">
            <Ornament />
          </div>
          <h2
            className="font-medium tracking-[-0.018em]"
            style={{
              fontFamily: SERIF,
              fontSize: 'clamp(2.2rem, 4.8vw, 3.6rem)',
              lineHeight: 1.05,
              color: INK,
            }}
          >
            Stop guessing. Start diagnosing.
          </h2>
          <p className="mt-6 mx-auto text-[17px] leading-[1.55]" style={{ color: INK_SOFT, fontFamily: SANS, maxWidth: '46ch' }}>
            Get clarity before you invest another dollar into design or development.
          </p>
        </Reveal>
        <Reveal delay={80}>
          <div className="mt-10">
            <YellowButton size="large">Apply for a Diagnosis</YellowButton>
            <p className="mt-4 text-[12px]" style={{ color: INK_SOFT, fontFamily: SANS }}>
              Every application reviewed personally. No pressure, no obligation.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-10" style={{ borderTop: `1px solid ${BORDER}` }}>
      <div className="max-w-[1080px] mx-auto px-6 md:px-8 flex items-center justify-between">
        <span className="text-[12px]" style={{ color: INK_SOFT, fontFamily: SANS }}>
          © 2026 Brand Foundry
        </span>
        <span className="text-[12px]" style={{ color: INK_SOFT, fontFamily: SANS }}>
          Clarity before design.
        </span>
      </div>
    </footer>
  )
}

// ─── Page ───
export default function LandingPageV3() {
  return (
    <div style={{ background: BG, minHeight: '100vh', fontFamily: SANS, color: INK }}>
      <style>{`
        .v3-reveal {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .v3-revealed {
          opacity: 1;
          transform: translateY(0);
        }
        [data-figma-capture="true"] .v3-reveal {
          opacity: 1 !important;
          transform: none !important;
          transition: none !important;
        }

        /* Realistic highlighter — two layered marker strokes drawn left → right.
           Uses inline backgrounds + box-decoration-break so each wrapped line
           renders its own stroke. */
        .v3-highlight {
          color: ${INK};
          padding: 0.05em 3px;
          background-repeat: no-repeat, no-repeat;
          background-position: 0 84%, 0 66%;
          background-size: 0% 48%, 0% 68%;
          background-image:
            linear-gradient(
              100deg,
              rgba(246, 197, 68, 0) 0%,
              rgba(246, 197, 68, 0.82) 3%,
              rgba(246, 197, 68, 0.96) 50%,
              rgba(246, 197, 68, 0.82) 97%,
              rgba(246, 197, 68, 0) 100%
            ),
            linear-gradient(
              97deg,
              rgba(246, 197, 68, 0) 0%,
              rgba(246, 197, 68, 0.42) 5%,
              rgba(246, 197, 68, 0.55) 95%,
              rgba(246, 197, 68, 0) 100%
            );
          -webkit-box-decoration-break: clone;
          box-decoration-break: clone;
          transition: background-size 1000ms cubic-bezier(0.3, 0.82, 0.4, 1);
          will-change: background-size;
        }
        .v3-highlight.is-drawn {
          background-size: 100% 48%, 100% 68%;
        }
        [data-figma-capture="true"] .v3-highlight {
          background-size: 100% 48%, 100% 68% !important;
          transition: none !important;
        }
        @media (prefers-reduced-motion: reduce) {
          .v3-highlight { transition: none; }
        }

        /* Margin scribble — handwritten rejection note tucked beside a word */
        .v3-notthis {
          position: relative;
          display: inline;
          white-space: nowrap;
        }
        .v3-notthis-note {
          font-family: "Caveat", cursive;
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
        .v3-notthis.is-drawn .v3-notthis-note {
          opacity: 0.82;
          transform: translateY(-0.35em) rotate(-7deg);
        }
        [data-figma-capture="true"] .v3-notthis-note {
          opacity: 0.82 !important;
          transform: translateY(-0.35em) rotate(-7deg) !important;
          transition: none !important;
        }
        @media (prefers-reduced-motion: reduce) {
          .v3-notthis-note { transition: none; }
        }

        body { background: ${BG}; }
      `}</style>
      <main>
        <Hero />
        <LetsBeHonest />
        <HowItWorks />
        <PainPoints />
        <Founder />
        <LogoWall />
        <WhatYouGet />
        <Comparison />
        <DiagnosisAreas />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
