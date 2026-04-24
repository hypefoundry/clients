import { useState, useEffect, useRef } from 'react'
import './index.css'

// ─── Scroll reveal ───
function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed')
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
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}

// ─── Shared components ───

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md border-b border-border' : ''}`}>
      <div className="max-w-[1100px] mx-auto px-6 md:px-10 flex items-center justify-between h-16">
        <a href="/" className="group flex items-center gap-2.5 text-base font-semibold tracking-tight text-text">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
            className="transition-transform duration-500 group-hover:rotate-90"
          >
            <path
              d="M7 0.5 L7.9 5.4 L13 6.5 L7.9 7.6 L7 13.5 L6.1 7.6 L1 6.5 L6.1 5.4 Z"
              fill="#fcc440"
              stroke="#071f2f"
              strokeWidth="0.6"
              strokeLinejoin="round"
            />
          </svg>
          Brand Foundry
        </a>
        <span
          className="hidden sm:flex items-center gap-2.5 text-text-muted"
          aria-label="Currently booking May 2026"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 rounded-full bg-highlight opacity-60 animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-highlight" />
          </span>
          <span
            className="text-[1.05rem] leading-none text-text"
            style={{ fontFamily: '"Caveat", cursive' }}
          >
            now booking — May 2026
          </span>
        </span>
      </div>
    </nav>
  )
}

function Button({ children, href = '#diagnosis', size = 'default', className = '' }) {
  const sizes = {
    default: 'px-10 py-4 text-sm',
    large: 'px-14 py-5 text-base',
  }
  return (
    <a
      href={href}
      className={`inline-block font-semibold tracking-[0.04em] rounded-full bg-text text-white transition-all duration-200 cursor-pointer hover:bg-highlight active:scale-[0.98] ${sizes[size]} ${className}`}
    >
      {children}
    </a>
  )
}

function Eyebrow({ children }) {
  return (
    <span className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase text-highlight mb-6">
      {children}
    </span>
  )
}

function Section({ children, className = '', id, variant = 'light' }) {
  const bg = {
    light: 'bg-bg',
    alt: 'bg-bg-alt',
    dark: 'bg-bg-dark text-text-light',
  }
  return (
    <section id={id} className={`${bg[variant]} ${className}`}>
      <div className="max-w-[780px] mx-auto px-6 md:px-10 text-center">
        {children}
      </div>
    </section>
  )
}

function SectionWide({ children, className = '', id, variant = 'light' }) {
  const bg = {
    light: 'bg-bg',
    alt: 'bg-bg-alt',
    dark: 'bg-bg-dark text-text-light',
  }
  return (
    <section id={id} className={`${bg[variant]} ${className}`}>
      <div className="max-w-[1000px] mx-auto px-6 md:px-10 text-center">
        {children}
      </div>
    </section>
  )
}

function Divider({ variant = 'light' }) {
  const color = variant === 'dark' ? 'border-white/10' : 'border-border'
  return <div className={`max-w-[200px] mx-auto border-t ${color}`} />
}

// ─── Sections ───

function Hero() {
  const [playing, setPlaying] = useState(false)

  return (
    <section className="bg-bg pt-32 pb-12 md:pt-44 md:pb-16">
      <div className="max-w-[1150px] mx-auto px-6 md:px-10 flex flex-col items-center text-center">
        <Reveal>
          <div className="flex flex-col items-center gap-5">
            <h1 className="text-[clamp(2.8rem,7vw,5rem)] leading-[0.95] tracking-[-0.03em] font-bold pb-2">
              Your website isn't<br />converting for a{' '}
              <span
                className="inline-block text-text align-baseline"
                style={{
                  fontFamily: '"Caveat", cursive',
                  fontWeight: 600,
                  fontSize: '1.35em',
                  lineHeight: 0.85,
                  transform: 'rotate(-3deg) translateY(0.04em)',
                }}
              >
                reason
              </span>
              .
            </h1>
            <p className="text-lg md:text-2xl text-text-muted leading-snug">
              We diagnose what's actually broken across your brand,<br />messaging, and website — so you can fix it properly.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80} className="w-full mt-16 md:mt-24">
          <div className="w-full">
            <div className="relative aspect-video bg-bg-dark overflow-hidden">
              {!playing ? (
                <button
                  onClick={() => setPlaying(true)}
                  className="absolute inset-0 w-full h-full flex items-center justify-center cursor-pointer bg-transparent border-0 z-10"
                  aria-label="Play video"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-bg-dark/60 via-bg-dark/80 to-bg-dark" />
                  <div className="w-20 h-14 md:w-[150px] md:h-[96px] bg-accent flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-accent-hover relative z-10">
                    <svg width="24" height="28" viewBox="0 0 24 28" fill="none">
                      <path d="M24 14L0 28V0L24 14Z" fill="white" />
                    </svg>
                  </div>
                </button>
              ) : (
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0"
                  title="Brand Foundry — Why most brands underperform"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              )}
            </div>
          </div>
        </Reveal>

        <Reveal delay={160} className="mt-10 md:mt-12">
          <div className="flex flex-col items-center gap-3">
            <a
              href="#diagnosis"
              className="inline-block font-medium text-base px-12 py-5 rounded-full bg-accent text-text transition-all duration-200 cursor-pointer hover:bg-accent-hover active:scale-[0.98]"
            >
              Get a Brand Diagnosis
            </a>
            <p className="text-xs text-text/75">
              No pressure. No obligation to rebuild.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function VideoSection() {
  const [playing, setPlaying] = useState(false)

  return (
    <SectionWide className="pb-24 md:pb-32 -mt-4">
      <Reveal>
        <p className="text-sm text-text-muted mb-8 tracking-wide font-medium">
          Watch: why most brands underperform
        </p>
        <div className="max-w-[800px] mx-auto">
          <div className="relative aspect-video bg-bg-dark rounded-xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] group">
            {!playing ? (
              <button
                onClick={() => setPlaying(true)}
                className="absolute inset-0 w-full h-full flex items-center justify-center cursor-pointer bg-transparent border-0 z-10"
                aria-label="Play video"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-bg-dark/60 via-bg-dark/80 to-bg-dark" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20">
                    <svg width="24" height="28" viewBox="0 0 24 28" fill="none" className="ml-1">
                      <path d="M24 14L0 28V0L24 14Z" fill="white" />
                    </svg>
                  </div>
                  <p className="text-white/60 text-sm mt-6 tracking-wide">2 min watch</p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <div className="text-[120px] md:text-[180px] font-bold text-white leading-none tracking-[-0.05em] select-none">
                    BF
                  </div>
                </div>
              </button>
            ) : (
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0"
                title="Brand Foundry — Why most brands underperform"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            )}
          </div>
        </div>
      </Reveal>
    </SectionWide>
  )
}

function PainPoints() {
  const points = [
    { lead: "You've spent money on a site that ", mark: "doesn't convert", trail: "." },
    { lead: "Your messaging ", mark: "changes every time", trail: " someone new touches it." },
    { lead: "You've hired designers, developers, or agencies — and ", mark: "still feel stuck", trail: "." },
    { lead: "Your content gets published but ", mark: "doesn't connect", trail: "." },
    { lead: "You don't know what to fix next, so you ", mark: "fix everything", trail: "." },
  ]

  const highlightStyle = {
    backgroundImage:
      'linear-gradient(180deg, transparent 58%, rgba(252, 196, 64, 0.55) 58%, rgba(252, 196, 64, 0.55) 92%, transparent 92%)',
  }

  // Subtle ruled lines across the section background
  const ruledBg = {
    backgroundImage:
      'repeating-linear-gradient(180deg, transparent 0px, transparent 35px, rgba(7, 31, 47, 0.08) 35px, rgba(7, 31, 47, 0.08) 36px)',
  }

  // Notebook page lines for the kicker card (more visible, cream paper)
  const notebookLines = {
    backgroundColor: '#f5efe2',
    backgroundImage:
      'repeating-linear-gradient(180deg, transparent 0px, transparent 41px, rgba(7, 31, 47, 0.18) 41px, rgba(7, 31, 47, 0.18) 42px)',
  }

  return (
    <section className="bg-bg-alt py-28 md:py-40 relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          ...ruledBg,
          maskImage:
            'linear-gradient(180deg, transparent 0%, black 18%, black 82%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(180deg, transparent 0%, black 18%, black 82%, transparent 100%)',
        }}
      />

      <div className="max-w-[1000px] mx-auto px-6 md:px-10 text-center relative">
        <Reveal>
          <Eyebrow>Before you redesign anything</Eyebrow>
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.12] tracking-[-0.02em] font-bold mb-20 md:mb-24">
            New logo. New site. New visuals.<br />Same problem underneath.
          </h2>
        </Reveal>

        <Reveal>
          <div className="relative max-w-[640px] mx-auto mb-20 md:mb-28">
            <div
              aria-hidden="true"
              className="hidden lg:block absolute -left-52 top-1 w-44 text-right pointer-events-none select-none"
            >
              <span
                className="block text-text"
                style={{
                  fontFamily: '"Permanent Marker", "Caveat", cursive',
                  fontSize: '1.05rem',
                  lineHeight: 1.15,
                  letterSpacing: '0.02em',
                  transform: 'rotate(-4deg)',
                  transformOrigin: 'right center',
                  textTransform: 'uppercase',
                }}
              >
                any of these<br />sound familiar?
              </span>
              <svg
                className="ml-auto mt-1 mr-2"
                width="70"
                height="44"
                viewBox="0 0 70 44"
                fill="none"
              >
                <path
                  d="M4 6 C 22 12, 42 22, 64 32 M64 32 L 56 30 M64 32 L 60 40"
                  stroke="#071f2f"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  opacity="0.85"
                />
              </svg>
            </div>
            <ul className="space-y-5 md:space-y-6">
              {points.map(({ lead, mark, trail }, i) => (
                <li
                  key={i}
                  className="text-[clamp(1.05rem,1.6vw,1.35rem)] leading-snug text-text"
                >
                  {lead}
                  <span className="px-0.5" style={highlightStyle}>{mark}</span>
                  {trail}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal>
          <div className="flex flex-col items-center">
            <div
              className="relative inline-block px-10 py-10 md:px-16 md:py-14 max-w-[640px]"
              style={{
                ...notebookLines,
                transform: 'rotate(-1.6deg)',
                boxShadow:
                  '0 1px 0 rgba(7,31,47,0.05), 0 26px 56px -28px rgba(7,31,47,0.28), 0 2px 6px -2px rgba(7,31,47,0.08)',
                clipPath:
                  'polygon(0.5% 1%, 99.2% 0.4%, 99.6% 98.6%, 0.8% 99.2%)',
              }}
            >
              <p
                className="text-text"
                style={{
                  fontFamily: '"Permanent Marker", "Caveat", cursive',
                  fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
                  lineHeight: 1.05,
                  letterSpacing: '0.01em',
                  textTransform: 'uppercase',
                }}
              >
                You're guessing.<br />Not diagnosing.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2" aria-hidden="true">
              <svg width="34" height="32" viewBox="0 0 34 32" fill="none">
                <path
                  d="M17 2 C 14 10, 10 18, 6 26 M6 26 L 12 22 M6 26 L 10 30"
                  stroke="#071f2f"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  opacity="0.75"
                />
              </svg>
              <span
                className="text-text-muted"
                style={{
                  fontFamily: '"Caveat", cursive',
                  fontSize: '1.4rem',
                  lineHeight: 1,
                  transform: 'rotate(-2deg)',
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

function Reframe() {
  return (
    <section className="py-24 md:py-32 bg-bg">
      <div className="max-w-[780px] mx-auto px-6 md:px-10 text-center">
        <Reveal>
          <Eyebrow>The cost of skipping diagnosis</Eyebrow>
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.12] tracking-[-0.02em] font-bold mb-10">
            Every month without clarity costs you customers
          </h2>
        </Reveal>
        <Reveal>
          <div className="max-w-[520px] mx-auto space-y-5 mb-16 md:mb-20">
            <p className="text-base md:text-lg text-text-muted leading-relaxed">
              Visitors leave your site in seconds. Leads go to competitors who communicate faster and clearer.
            </p>
            <p className="text-base md:text-lg text-text-muted leading-relaxed">
              Another rebrand won't fix it. Another agency won't either — not without understanding the root cause first.
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <div className="max-w-[1320px] mx-auto mb-16 md:mb-24 px-4 md:px-6">
          <div className="bg-accent relative overflow-hidden py-8 md:py-12" style={{ transform: 'rotate(-0.6deg)' }}>
            <svg
              viewBox="0 0 800 460"
              className="w-full h-auto block"
              role="img"
              aria-label="Hand-drawn chart: two paths diverge from today. With diagnosis curves upward; without diagnosis drifts downward."
              style={{ fontFamily: "'Caveat', cursive" }}
            >
              {/* Decorative four-point stars */}
              <g fill="#0a0f1a">
                <path d="M 120 80 L 128 100 L 148 108 L 128 116 L 120 136 L 112 116 L 92 108 L 112 100 Z" />
                <path d="M 700 110 L 706 124 L 720 130 L 706 136 L 700 150 L 694 136 L 680 130 L 694 124 Z" transform="rotate(15 700 130)" />
                <path d="M 660 410 L 666 422 L 678 428 L 666 434 L 660 446 L 654 434 L 642 428 L 654 422 Z" />
              </g>
              {/* Asterisk-style sparkles */}
              <g stroke="#0a0f1a" strokeWidth="3" strokeLinecap="round" fill="none">
                <g transform="translate(560 60)">
                  <line x1="-10" y1="0" x2="10" y2="0" />
                  <line x1="0" y1="-10" x2="0" y2="10" />
                  <line x1="-7" y1="-7" x2="7" y2="7" />
                  <line x1="-7" y1="7" x2="7" y2="-7" />
                </g>
                <g transform="translate(180 380)">
                  <line x1="-8" y1="0" x2="8" y2="0" />
                  <line x1="0" y1="-8" x2="0" y2="8" />
                </g>
              </g>

              {/* Wobbly start dot with "TODAY" annotation */}
              <g transform="translate(150 250)">
                <circle r="9" fill="#0a0f1a" />
                <circle r="14" fill="none" stroke="#0a0f1a" strokeWidth="2" />
                <text
                  x="-22"
                  y="46"
                  fontSize="26"
                  fontWeight="600"
                  fill="#0a0f1a"
                  fontFamily="'Caveat', cursive"
                >
                  today
                </text>
              </g>

              {/* WITH DIAGNOSIS — wobbly upward curve */}
              <path
                d="M 158 247 C 260 252, 340 215, 430 165 S 600 88, 700 70"
                fill="none"
                stroke="#0a0f1a"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Slight ink wobble — second pass */}
              <path
                d="M 162 250 C 268 254, 348 220, 432 168 S 602 92, 696 73"
                fill="none"
                stroke="#0a0f1a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.55"
              />
              {/* Arrowhead — with diagnosis */}
              <g transform="translate(700 70) rotate(-15)">
                <path
                  d="M 0 0 L -22 -10 M 0 0 L -22 10"
                  fill="none"
                  stroke="#0a0f1a"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              {/* Label — with diagnosis */}
              <g transform="translate(560 30)">
                <text
                  fontSize="34"
                  fontWeight="700"
                  fill="#0a0f1a"
                  fontFamily="'Caveat', cursive"
                >
                  with diagnosis
                </text>
                <path
                  d="M 6 10 C 60 14, 120 12, 196 8"
                  fill="none"
                  stroke="#0a0f1a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.7"
                />
              </g>

              {/* WITHOUT DIAGNOSIS — wobbly downward curve */}
              <path
                d="M 158 253 C 250 258, 340 285, 430 320 S 590 380, 670 410"
                fill="none"
                stroke="#0a0f1a"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Slight ink wobble */}
              <path
                d="M 160 256 C 254 262, 344 290, 428 322 S 588 384, 668 412"
                fill="none"
                stroke="#0a0f1a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.55"
              />
              {/* Arrowhead — without diagnosis */}
              <g transform="translate(670 410) rotate(20)">
                <path
                  d="M 0 0 L -22 -10 M 0 0 L -22 10"
                  fill="none"
                  stroke="#0a0f1a"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              {/* Label — without diagnosis */}
              <g transform="translate(420 460)">
                <text
                  fontSize="34"
                  fontWeight="700"
                  fill="#0a0f1a"
                  fontFamily="'Caveat', cursive"
                >
                  without diagnosis
                </text>
                <path
                  d="M 6 10 C 80 14, 180 12, 268 8"
                  fill="none"
                  stroke="#0a0f1a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.7"
                />
              </g>

              {/* "6 months" annotation near the right */}
              <text
                x="760"
                y="245"
                textAnchor="end"
                fontSize="22"
                fontWeight="500"
                fill="#0a0f1a"
                fontFamily="'Caveat', cursive"
                opacity="0.65"
                transform="rotate(-2 760 245)"
              >
                six months from now →
              </text>
            </svg>
          </div>
        </div>
      </Reveal>

      <div className="max-w-[780px] mx-auto px-6 md:px-10 text-center">
        <Reveal>
          <p className="text-2xl md:text-3xl font-bold leading-snug text-text tracking-[-0.02em] max-w-[600px] mx-auto">
            You need a diagnosis before a prescription.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

function DiagnosisOffer() {
  const items = [
    "A detailed breakdown of what's costing you conversions",
    "Specific actions to fix it — prioritised by impact",
    "An honest assessment of what's worth fixing — and what's not",
  ]

  return (
    <Section className="py-24 md:py-32" variant="dark" id="diagnosis">
      <Reveal>
        <Eyebrow>Brand Diagnosis</Eyebrow>
        <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.12] tracking-[-0.02em] font-bold mb-6 text-white">
          Find out what's{' '}
          <span className="relative inline-block">
            actually broken
            <svg
              aria-hidden="true"
              className="absolute left-0 -bottom-1 md:-bottom-2 w-full h-3 md:h-[14px]"
              viewBox="0 0 240 14"
              preserveAspectRatio="none"
            >
              <path
                d="M 4 9 C 36 2, 76 13, 120 7 S 200 13, 236 5"
                fill="none"
                stroke="#fcc440"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h2>
        <p className="text-base md:text-lg text-white/60 leading-relaxed mb-14 max-w-[520px] mx-auto">
          We analyse your brand, messaging, and website — and tell you exactly what to fix first.
        </p>
      </Reveal>
      <Reveal>
        <div className="max-w-[460px] mx-auto mb-14">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/40 mb-7">What you get</p>
          <ul className="space-y-5">
            {items.map((item, i) => (
              <li key={i} className="flex items-start gap-4 text-left">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  className="shrink-0 mt-1"
                  aria-hidden="true"
                >
                  <path
                    d="M 4 14 C 6 15, 8 17, 10 19 C 13 13, 17 7, 22 4"
                    fill="none"
                    stroke="#fcc440"
                    strokeWidth="2.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-base md:text-lg text-white/90 leading-relaxed">{item}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative inline-block">
          <Button className="bg-white! text-text! hover:bg-white/90! hover:text-text!">Book Your Diagnosis</Button>
          <div
            className="absolute top-1/2 left-full ml-2 -translate-y-1/2 hidden md:flex items-center pointer-events-none"
            aria-hidden="true"
          >
            <svg width="64" height="40" viewBox="0 0 64 40">
              <path
                d="M 58 26 C 42 8, 22 6, 8 22"
                fill="none"
                stroke="#fcc440"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M 8 22 L 16 17 M 8 22 L 14 30"
                fill="none"
                stroke="#fcc440"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              style={{ fontFamily: "'Caveat', cursive" }}
              className="text-accent text-[28px] font-semibold whitespace-nowrap leading-none -translate-y-2"
            >
              start here
            </span>
          </div>
        </div>
        <p className="text-xs text-white/40 mt-5 tracking-wide">
          No long proposal. No bloated process. Just clarity.
        </p>
      </Reveal>
    </Section>
  )
}

function ProcessDoodle({ step }) {
  if (step === 1) {
    // Paper plane in flight (Submit)
    return (
      <svg viewBox="0 0 140 110" className="w-[140px] h-[110px] mx-auto" aria-hidden="true">
        <g stroke="#0a0f1a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M 110 50 L 18 28 L 42 56 L 18 78 Z" />
          <path d="M 110 50 L 42 56" />
        </g>
        <g fill="#0a0f1a">
          <circle cx="14" cy="86" r="2" />
          <circle cx="6" cy="94" r="2" />
        </g>
        <g stroke="#0a0f1a" strokeWidth="2.25" strokeLinecap="round">
          <line x1="118" y1="22" x2="128" y2="22" />
          <line x1="123" y1="17" x2="123" y2="27" />
          <line x1="119.5" y1="18.5" x2="126.5" y2="25.5" />
          <line x1="119.5" y1="25.5" x2="126.5" y2="18.5" />
        </g>
      </svg>
    )
  }
  if (step === 2) {
    // Magnifying glass over a marked-up page (Diagnose)
    return (
      <svg viewBox="0 0 140 110" className="w-[140px] h-[110px] mx-auto" aria-hidden="true">
        <g stroke="#0a0f1a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M 18 22 L 60 22 L 60 90 L 18 90 Z" />
        </g>
        <g stroke="#0a0f1a" strokeWidth="2" strokeLinecap="round" fill="none">
          <line x1="26" y1="33" x2="52" y2="33" />
          <line x1="26" y1="42" x2="48" y2="42" />
          <line x1="26" y1="60" x2="52" y2="60" />
          <line x1="26" y1="78" x2="44" y2="78" />
        </g>
        <path d="M 24 50 C 32 47, 46 53, 56 49" stroke="#fcc440" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.85" />
        <ellipse cx="38" cy="69" rx="10" ry="4" stroke="#fcc440" strokeWidth="2" fill="none" />
        <g stroke="#0a0f1a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="#f7f7f5">
          <circle cx="92" cy="58" r="22" />
        </g>
        <line x1="108" y1="74" x2="122" y2="90" stroke="#0a0f1a" strokeWidth="3.5" strokeLinecap="round" />
        <g stroke="#0a0f1a" strokeWidth="2.25" strokeLinecap="round">
          <line x1="106" y1="22" x2="116" y2="22" />
          <line x1="111" y1="17" x2="111" y2="27" />
        </g>
      </svg>
    )
  }
  // Signpost with arrow (Direction)
  return (
    <svg viewBox="0 0 140 110" className="w-[140px] h-[110px] mx-auto" aria-hidden="true">
      <g stroke="#0a0f1a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <line x1="56" y1="32" x2="56" y2="92" />
        <path d="M 56 36 L 110 36 L 122 48 L 110 60 L 56 60" />
        <path d="M 56 70 L 32 70 L 22 80 L 32 90 L 56 90" />
        <line x1="38" y1="98" x2="74" y2="98" />
      </g>
      <g fill="#0a0f1a">
        <path d="M 102 44 L 108 50 L 102 56 L 96 50 Z" />
      </g>
      <g stroke="#0a0f1a" strokeWidth="2.25" strokeLinecap="round">
        <line x1="118" y1="20" x2="128" y2="20" />
        <line x1="123" y1="15" x2="123" y2="25" />
        <line x1="119.5" y1="16.5" x2="126.5" y2="23.5" />
        <line x1="119.5" y1="23.5" x2="126.5" y2="16.5" />
      </g>
    </svg>
  )
}

function Process() {
  const steps = [
    { title: 'Submit your business', desc: 'Quick context on your brand and website' },
    { title: 'We diagnose the issues', desc: 'Brand, messaging, structure, conversion' },
    { title: 'Get clear direction', desc: "What's wrong and what to do next" },
  ]

  const tilts = ['rotate(-2deg)', 'rotate(1.5deg)', 'rotate(-1deg)']

  return (
    <SectionWide className="py-24 md:py-32" variant="alt">
      <Reveal>
        <Eyebrow>Process</Eyebrow>
        <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.12] tracking-[-0.02em] font-bold mb-16 md:mb-20">
          How it works
        </h2>
      </Reveal>
      <div className="grid md:grid-cols-3 gap-12 md:gap-10 max-w-[920px] mx-auto">
        {steps.map((step, i) => (
          <Reveal key={i} delay={i * 100}>
            <div className="text-center px-4">
              <div className="mb-6" style={{ transform: tilts[i] }}>
                <ProcessDoodle step={i + 1} />
              </div>
              <h3 className="text-lg font-bold text-text mb-2">{step.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed max-w-[260px] mx-auto">{step.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <p className="text-sm text-text-muted mt-16 tracking-wide">
          No long retainers. No bloated process.
        </p>
      </Reveal>
    </SectionWide>
  )
}

function Trust() {
  return (
    <SectionWide className="py-24 md:py-32">
      <Reveal>
        <Eyebrow>Transformation</Eyebrow>
        <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.12] tracking-[-0.02em] font-bold mb-16">
          What changes after this
        </h2>
      </Reveal>
      <Reveal>
        <div className="relative max-w-[700px] mx-auto">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="p-8 md:p-10 border border-border rounded-lg bg-bg-alt text-center">
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-text-muted">Before</span>
              <p className="text-lg md:text-xl text-text-muted mt-5 leading-relaxed font-light">
                "I think we need a redesign..."
              </p>
            </div>
            <div className="p-8 md:p-10 border-2 border-text rounded-lg bg-white text-center">
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-text">After</span>
              <p className="text-lg md:text-xl text-text mt-5 leading-relaxed font-semibold">
                "I know exactly what's wrong and what to do next."
              </p>
            </div>
          </div>
          <div
            className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex-col items-center pointer-events-none select-none"
            aria-hidden="true"
          >
            <span
              className="text-text text-2xl leading-none"
              style={{ fontFamily: '"Caveat", cursive', transform: 'rotate(-4deg)' }}
            >
              this is the shift
            </span>
            <svg width="56" height="40" viewBox="0 0 56 40" fill="none" className="mt-1 -mr-8">
              <path
                d="M8 6 C 18 4, 32 10, 44 22 M44 22 L 36 18 M44 22 L 40 30"
                stroke="#071f2f"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>
        </div>
      </Reveal>
    </SectionWide>
  )
}

function FAQ() {
  const faqs = [
    { q: 'Do I need a full redesign?', a: "Not always. Sometimes small changes fix bigger issues." },
    { q: 'Is this a sales call?', a: "No. You'll leave with clear, actionable insight." },
    { q: 'What happens after?', a: 'You can implement yourself or work with us.' },
  ]

  return (
    <Section className="py-24 md:py-32" variant="alt">
      <Reveal>
        <Eyebrow>FAQ</Eyebrow>
        <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.12] tracking-[-0.02em] font-bold mb-14">
          Questions
        </h2>
      </Reveal>
      <Reveal>
        <div className="max-w-[560px] mx-auto">
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </Reveal>
    </Section>
  )
}

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false)
  const contentRef = useRef(null)

  return (
    <div className="border-b border-border text-left">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between py-6 cursor-pointer bg-transparent border-0 text-left group"
      >
        <span className="text-base md:text-lg font-semibold text-text pr-4 group-hover:text-highlight transition-colors">{question}</span>
        <span className={`text-text-muted text-base font-light transition-transform duration-300 shrink-0 select-none ${open ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{ maxHeight: open ? `${contentRef.current?.scrollHeight || 200}px` : '0px' }}
      >
        <p ref={contentRef} className="text-sm text-text-muted leading-relaxed pb-6">{answer}</p>
      </div>
    </div>
  )
}

function About() {
  return (
    <Section className="py-24 md:py-32" id="about">
      <Reveal>
        <h2 className="text-[clamp(2.2rem,5vw,3.4rem)] leading-[1.08] tracking-[-0.02em] font-bold text-text mb-14 md:mb-20 text-center">
          A note from Clark
        </h2>
      </Reveal>

      <Reveal>
        <div
          className="max-w-[720px] mx-auto bg-white border border-border rounded-md px-8 py-12 md:px-16 md:py-20 text-left"
          style={{
            transform: 'rotate(-0.6deg)',
            boxShadow:
              '0 1px 0 rgba(7,31,47,0.04), 0 18px 40px -24px rgba(7,31,47,0.18), 0 2px 6px -2px rgba(7,31,47,0.06)',
          }}
        >
          <div className="space-y-6 text-[15px] md:text-[17px] leading-[1.75] text-text">
            <p>Hey, it's Clark.</p>

            <p>
              If you're here, chances are you've already invested real money into your brand or your website. But something isn't pulling its weight — leads aren't converting, the messaging keeps shifting, or the whole thing just feels off in a way you can't quite name.
            </p>

            <p>
              You didn't build a business to keep guessing what's broken. Or to spend another five figures on a redesign that might fix it. You want to know — clearly — what's working, what isn't, and what's actually worth doing about it.
            </p>

            <p>
              That's what Brand Foundry exists for. After 15+ years designing brands and websites, I kept seeing the same thing: most brands don't have a design problem. They have a clarity problem. And no amount of new visuals fixes it.
            </p>

            <p>
              So I stopped offering rebuilds as the first answer. Now I run a <strong className="font-semibold">Brand Diagnosis</strong> instead. One focused session. You walk away knowing exactly where the issue is — positioning, messaging, structure, or something else — and what's worth fixing first. Sometimes it's a redesign. Often it isn't.
            </p>

            <p>
              If you've read this far and something in here is landing — odds are this is for you.
            </p>

            <p>Talk soon.</p>
          </div>

          <div className="mt-12">
            <span
              className="block text-text text-5xl md:text-6xl leading-none"
              style={{ fontFamily: '"Caveat", cursive', transform: 'rotate(-3deg)', transformOrigin: 'left' }}
            >
              Clark
            </span>
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm font-semibold text-text">Clark</p>
              <p className="text-sm text-text-muted">Founder, Brand Foundry</p>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <p className="text-sm text-text-muted mt-10 max-w-[560px] mx-auto tracking-wide">
          Mostly works with founders, solo operators, and small teams investing in their business but not seeing results.
        </p>
      </Reveal>
    </Section>
  )
}

function FinalCTA() {
  return (
    <Section className="py-28 md:py-40" variant="dark">
      <Reveal>
        <h2 className="text-[clamp(2.4rem,5.5vw,3.8rem)] leading-[1.06] tracking-[-0.03em] font-bold mb-6 text-white">
          Stop guessing.
        </h2>
        <p className="text-base md:text-lg text-white/60 leading-relaxed mb-12 max-w-[480px] mx-auto">
          Get clarity before you invest another dollar into design or development.
        </p>
      </Reveal>
      <Reveal delay={100}>
        <Button size="large" className="bg-white! text-text! hover:bg-white/90! hover:text-text!">Get a Brand Diagnosis</Button>
        <p className="text-xs text-white/40 mt-5 tracking-wide">
          No obligation. Just clarity.
        </p>
      </Reveal>
    </Section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-border py-8 bg-bg">
      <div className="max-w-[1100px] mx-auto px-6 md:px-10 flex items-center justify-between">
        <span className="text-xs text-text-muted">&copy; 2026 Brand Foundry</span>
        <span className="text-xs text-text-muted">Clarity before design.</span>
      </div>
    </footer>
  )
}

// ─── Page ───

export default function LandingPage() {
  return (
    <>
      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.6s cubic-bezier(0.25, 0.1, 0.25, 1),
                      transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1);
        }
        .revealed {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
      <Nav />
      <main>
        <Hero />
        <PainPoints />
        <Reframe />
        <DiagnosisOffer />
        <Process />
        <Trust />
        <FAQ />
        <About />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
