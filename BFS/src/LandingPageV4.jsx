import { useState, useEffect, useRef } from 'react'
import './index.css'

// ─── Theme — Wolff Olins-inspired: bold color blocks, oversized editorial type ───
const SERIF = '"Bespoke Serif", "Source Serif 4", Georgia, serif'
const SANS = '"Hanken Grotesk", "Inter", system-ui, sans-serif'
const INK = '#1a1814'
const INK_SOFT = '#5b554a'
const PAPER = '#f6efe1'
const CREAM = '#efe5cc'
const TOMATO = '#d8492a'
const TOMATO_DEEP = '#b8381e'
const FOREST = '#1f3d33'
const YELLOW = '#f6c544'
const DARK = '#0b0b0b'
const BORDER_INK = 'rgba(26,24,20,0.14)'

// ─── Reveal on scroll ───
function useReveal() {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true)
          obs.unobserve(el)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, seen]
}

function Reveal({ children, delay = 0, className = '' }) {
  const [ref, seen] = useReveal()
  return (
    <div
      ref={ref}
      className={`v3-reveal ${seen ? 'v3-revealed' : ''} ${className}`}
      style={{
        opacity: seen ? 1 : 0,
        transform: seen ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 820ms cubic-bezier(0.22,0.9,0.3,1) ${delay}ms, transform 860ms cubic-bezier(0.22,0.9,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// ─── Hand-drawn marker highlight ───
function Highlight({ children, color = YELLOW }) {
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
  return (
    <span ref={ref} className="v4-hl" style={{ '--hl': color }}>
      {children}
    </span>
  )
}

// ─── Margin scribble — handwritten rejection ───
function NotThis({ children, note = 'nope' }) {
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
      { threshold: 0.6, rootMargin: '0px 0px -35% 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <span ref={ref} className="v4-notthis">
      <span>{children}</span>
      <span className="v4-notthis-note" aria-hidden="true">{note}</span>
    </span>
  )
}

// ─── Hand-drawn circle around a word ───
function Circled({ children }) {
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
      { threshold: 0.55, rootMargin: '0px 0px -30% 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <span ref={ref} className="v4-circled">
      <span className="v4-circled-word">{children}</span>
      <svg className="v4-circled-svg" viewBox="0 0 100 60" preserveAspectRatio="none" aria-hidden="true">
        <path
          pathLength="1"
          d="M 50 4 C 78 5, 97 16, 96 30 C 96 48, 72 56, 48 55 C 22 54, 4 46, 5 30 C 6 14, 28 5, 50 4 Z"
        />
      </svg>
    </span>
  )
}

// ─── Hand-drawn arrow ───
function HandArrow({ className = '', style = {}, color = INK }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 140 90"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M 8 12 C 42 8, 92 22, 122 66"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M 112 56 L 124 68 L 110 72"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

// ─── Hand-drawn star/asterisk ornament ───
function StarMark({ className = '', style = {}, color = INK }) {
  return (
    <svg className={className} style={style} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <g stroke={color} strokeWidth="2" strokeLinecap="round">
        <line x1="20" y1="4" x2="20" y2="36" />
        <line x1="4" y1="20" x2="36" y2="20" />
        <line x1="8" y1="8" x2="32" y2="32" />
        <line x1="32" y1="8" x2="8" y2="32" />
      </g>
    </svg>
  )
}

// ─── Wordmark ───
function Wordmark({ onDark = false }) {
  return (
    <div className="inline-flex items-center gap-2.5">
      <svg width={26} height={26} viewBox="0 0 28 28" aria-hidden="true">
        <rect x="2" y="2" width="24" height="24" rx="2" fill={onDark ? '#fff' : INK} />
        <path
          d="M14 7.5 L15.6 12.4 L20.5 14 L15.6 15.6 L14 20.5 L12.4 15.6 L7.5 14 L12.4 12.4 Z"
          fill={YELLOW}
        />
      </svg>
      <span
        className="block text-[10.5px] font-bold tracking-[0.2em] uppercase leading-[1.15]"
        style={{ color: onDark ? '#fff' : INK, fontFamily: SANS }}
      >
        Brand<br />Foundry<br />Studio
      </span>
    </div>
  )
}

// ─── Yellow CTA button ───
function YellowButton({ size = 'medium', children }) {
  const padding = size === 'large' ? 'px-8 py-5' : 'px-6 py-4'
  const fontSize = size === 'large' ? 'text-[15px] md:text-[16px]' : 'text-[14px]'
  return (
    <button
      className={`${padding} ${fontSize} font-bold tracking-[0.02em] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0`}
      style={{
        background: YELLOW,
        color: INK,
        fontFamily: SANS,
        border: `1.5px solid ${INK}`,
        borderRadius: 999,
        boxShadow: `4px 4px 0 ${INK}`,
      }}
    >
      {children}
    </button>
  )
}

// ─── Top nav (light) ───
function Nav() {
  return (
    <header
      className="relative z-20"
      style={{ background: 'transparent' }}
    >
      <div className="max-w-[1320px] mx-auto px-6 md:px-10 pt-7 pb-2 flex items-center justify-between">
        <Wordmark />
        <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium" style={{ fontFamily: SANS, color: INK }}>
          <a href="#how">How it works</a>
          <a href="#proof">Proof</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div className="hidden md:block">
          <a
            href="#apply"
            className="inline-block text-[13px] font-bold tracking-[0.02em] px-5 py-2.5"
            style={{
              fontFamily: SANS,
              color: INK,
              border: `1.5px solid ${INK}`,
              borderRadius: 999,
            }}
          >
            Apply
          </a>
        </div>
      </div>
    </header>
  )
}

// ─── Hero — oversized editorial statement on paper ───
function Hero() {
  return (
    <section className="relative overflow-hidden" style={{ background: PAPER }}>
      <Nav />

      {/* Floating ornaments */}
      <StarMark
        className="absolute"
        style={{ top: 120, right: '8%', width: 32, height: 32, opacity: 0.55 }}
        color={TOMATO}
      />
      <StarMark
        className="absolute hidden md:block"
        style={{ bottom: 140, left: '6%', width: 24, height: 24, opacity: 0.5, transform: 'rotate(18deg)' }}
        color={INK}
      />

      <div className="relative max-w-[1320px] mx-auto px-6 md:px-10 pt-12 md:pt-20 pb-24 md:pb-32">
        <Reveal>
          <p
            className="text-[12px] md:text-[13px] font-semibold tracking-[0.14em] uppercase"
            style={{ color: TOMATO, fontFamily: SANS }}
          >
            For founders weighing another rebrand
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h1
            className="mt-6 md:mt-8 font-medium tracking-[-0.028em]"
            style={{
              fontFamily: SERIF,
              fontSize: 'clamp(3rem, 9vw, 9rem)',
              lineHeight: 0.94,
              color: INK,
              maxWidth: '14ch',
            }}
          >
            Find what&rsquo;s actually <Highlight>not working</Highlight>{' '}
            <span style={{ fontStyle: 'italic' }}>before</span> you rebrand.
          </h1>
        </Reveal>

        <div className="mt-12 md:mt-16 grid md:grid-cols-12 gap-8 md:gap-12 items-end">
          <Reveal delay={160} className="md:col-span-6">
            <p
              className="text-[18px] md:text-[20px] leading-[1.5]"
              style={{ color: INK_SOFT, fontFamily: SANS, maxWidth: '42ch' }}
            >
              A focused, one-session diagnosis from a designer with 15+ years in the room.
              No retainers. No bloated proposals. Just the answer to &ldquo;what should I actually fix first?&rdquo;
            </p>
          </Reveal>
          <Reveal delay={220} className="md:col-span-6 flex md:justify-end">
            <div className="flex items-center gap-6">
              <YellowButton size="large">Apply for a Diagnosis</YellowButton>
              <div className="hidden md:flex items-center gap-3">
                <HandArrow
                  style={{ width: 92, height: 60, transform: 'rotate(-8deg) scaleX(-1)' }}
                  color={INK}
                />
                <span
                  style={{
                    fontFamily: '"Caveat", cursive',
                    fontSize: '1.3rem',
                    color: INK,
                    transform: 'rotate(-4deg)',
                    display: 'inline-block',
                  }}
                >
                  every application<br />reviewed personally
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Bottom editorial strip */}
      <div
        className="relative border-t"
        style={{ background: INK, color: '#fff', borderColor: INK }}
      >
        <div className="max-w-[1320px] mx-auto px-6 md:px-10 py-5 flex flex-wrap items-center gap-x-10 gap-y-2 text-[12px] tracking-[0.08em] uppercase font-semibold" style={{ fontFamily: SANS }}>
          <span style={{ color: YELLOW }}>● Now booking</span>
          <span>One session · 90 minutes</span>
          <span>Delivered as a written playbook</span>
          <span style={{ marginLeft: 'auto', opacity: 0.7 }}>Est. 2010</span>
        </div>
      </div>
    </section>
  )
}

// ─── Argument section — editorial, big italic statement ───
function Argument() {
  return (
    <section className="relative py-28 md:py-40" style={{ background: '#fff' }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <Reveal>
          <p
            className="text-[11px] md:text-[12px] font-semibold tracking-[0.2em] uppercase"
            style={{ color: TOMATO, fontFamily: SANS }}
          >
            01 &mdash; The honest truth
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h2
            className="mt-8 md:mt-10 font-medium tracking-[-0.018em]"
            style={{
              fontFamily: SERIF,
              fontSize: 'clamp(2.2rem, 6vw, 5.2rem)',
              lineHeight: 0.98,
              color: INK,
              fontStyle: 'italic',
              maxWidth: '18ch',
            }}
          >
            Is another rebrand actually the answer?
          </h2>
        </Reveal>

        <div className="mt-16 md:mt-20 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-1 hidden md:block" />
          <Reveal delay={120} className="md:col-span-7">
            <div
              className="space-y-6 text-[19px] md:text-[21px] leading-[1.5]"
              style={{ color: INK, fontFamily: SANS }}
            >
              <p>You&rsquo;ve been told to refresh the brand.</p>
              <p>You&rsquo;ve been told to <NotThis>rewrite</NotThis> the site.</p>
              <p>You&rsquo;ve been told a <NotThis>new logo</NotThis> will fix it.</p>
              <p>
                So you did. You hired the studio, approved the visuals, shipped the new site.
                And what happened? A few compliments from other designers. A polite nod from your team.
                The same leads trickling in. The same messaging drifting.
              </p>
              <p className="text-[20px] md:text-[24px] leading-[1.35]" style={{ color: INK }}>
                Redesigning isn&rsquo;t the problem.{' '}
                <Highlight>You haven&rsquo;t diagnosed what&rsquo;s actually broken.</Highlight>
              </p>
            </div>
          </Reveal>
          <Reveal delay={220} className="md:col-span-4 md:col-start-9">
            <div
              className="relative p-8 md:p-10"
              style={{
                background: CREAM,
                border: `1.5px solid ${INK}`,
                borderRadius: 2,
                transform: 'rotate(1.2deg)',
              }}
            >
              <p
                className="text-[13px] font-bold tracking-[0.14em] uppercase"
                style={{ color: TOMATO, fontFamily: SANS }}
              >
                What&rsquo;s missing
              </p>
              <ul className="mt-4 space-y-3 text-[15px] leading-[1.45]" style={{ color: INK, fontFamily: SANS }}>
                <li>— Clarity on positioning</li>
                <li>— Sharp messaging</li>
                <li>— Structure that guides the visitor</li>
                <li>— A path from landed to got-in-touch</li>
              </ul>
              <StarMark
                className="absolute"
                style={{ top: -16, right: -16, width: 36, height: 36 }}
                color={TOMATO}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// ─── Numbered process — editorial, large numerals ───
function Process() {
  const steps = [
    {
      n: '01',
      title: 'Submit',
      body: 'A short form covering your brand, site, audience, and what feels off. Five minutes — no decks, no discovery call.',
      accent: TOMATO,
      note: 'five minutes',
    },
    {
      n: '02',
      title: 'Diagnose',
      body: "A 90-minute session walking through what's actually broken across brand, messaging, structure, and conversion.",
      accent: FOREST,
      note: 'no guessing',
    },
    {
      n: '03',
      title: 'Direction',
      body: 'A written playbook: prioritised actions, what to fix first, what to leave alone. Work with us or take it to your team.',
      accent: INK,
      note: 'walk away clear',
    },
  ]
  return (
    <section id="how" className="relative py-28 md:py-36" style={{ background: PAPER }}>
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        <Reveal>
          <p
            className="text-[11px] md:text-[12px] font-semibold tracking-[0.2em] uppercase"
            style={{ color: TOMATO, fontFamily: SANS }}
          >
            02 &mdash; How it works
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h2
            className="mt-8 md:mt-10 font-medium tracking-[-0.022em]"
            style={{
              fontFamily: SERIF,
              fontSize: 'clamp(2.4rem, 6vw, 5.6rem)',
              lineHeight: 0.96,
              color: INK,
              maxWidth: '16ch',
            }}
          >
            Start with a diagnosis,<br />not a <NotThis>redesign</NotThis>.
          </h2>
        </Reveal>

        <div className="mt-20 md:mt-28 space-y-20 md:space-y-28">
          {steps.map((s, i) => {
            const isOdd = i % 2 === 1
            return (
              <Reveal key={s.n} delay={i * 80}>
                <div className="grid md:grid-cols-12 gap-8 md:gap-10 items-start">
                  <div
                    className={`md:row-start-1 md:col-span-5 ${
                      isOdd ? 'md:col-start-8' : 'md:col-start-1'
                    }`}
                  >
                    <p
                      className="font-medium"
                      style={{
                        fontFamily: SERIF,
                        fontSize: 'clamp(6rem, 16vw, 13rem)',
                        lineHeight: 0.82,
                        color: s.accent,
                        letterSpacing: '-0.04em',
                      }}
                    >
                      {s.n}
                    </p>
                  </div>
                  <div
                    className={`md:row-start-1 md:col-span-6 md:pt-6 ${
                      isOdd ? 'md:col-start-1' : 'md:col-start-7'
                    }`}
                  >
                    <h3
                      className="font-medium tracking-[-0.018em]"
                      style={{
                        fontFamily: SERIF,
                        fontSize: 'clamp(2rem, 4.2vw, 3.4rem)',
                        lineHeight: 1.02,
                        color: INK,
                      }}
                    >
                      {s.title}
                    </h3>
                    <p
                      className="mt-5 text-[17px] md:text-[19px] leading-[1.55]"
                      style={{ color: INK_SOFT, fontFamily: SANS, maxWidth: '46ch' }}
                    >
                      {s.body}
                    </p>
                    <div className="mt-6 flex items-center gap-3">
                      <HandArrow
                        style={{
                          width: 56,
                          height: 36,
                          transform: isOdd ? 'rotate(6deg) scaleX(-1)' : 'rotate(6deg)',
                        }}
                        color={s.accent}
                      />
                      <span
                        style={{
                          fontFamily: '"Caveat", cursive',
                          fontSize: '1.35rem',
                          color: s.accent,
                          transform: 'rotate(-3deg)',
                          display: 'inline-block',
                        }}
                      >
                        {s.note}
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Pain points — on bold tomato block ───
function Pain() {
  const points = [
    { lead: "You've spent money on a site that ", mark: "doesn't convert", trail: "." },
    { lead: "Your messaging ", mark: "changes every time", trail: " someone new touches it." },
    { lead: "You've hired designers, developers, agencies — and ", mark: "still feel stuck", trail: "." },
    { lead: "Your content gets published but ", mark: "doesn't connect", trail: "." },
    { lead: "You don't know what to fix next, so you ", mark: "fix everything", trail: "." },
  ]
  return (
    <section
      className="relative py-28 md:py-40 overflow-hidden"
      style={{ background: TOMATO, color: '#fff' }}
    >
      {/* Decorative organic blob */}
      <svg
        className="absolute pointer-events-none"
        style={{ top: -80, right: -100, width: 420, height: 420, opacity: 0.18 }}
        viewBox="0 0 200 200"
        aria-hidden="true"
      >
        <path
          d="M 100 10 C 140 14, 186 42, 188 92 C 190 142, 148 184, 96 188 C 44 192, 8 148, 10 96 C 12 44, 60 6, 100 10 Z"
          fill="#fff"
        />
      </svg>

      <div className="relative max-w-[1200px] mx-auto px-6 md:px-10">
        <Reveal>
          <p
            className="text-[11px] md:text-[12px] font-semibold tracking-[0.2em] uppercase"
            style={{ color: '#fff', opacity: 0.7, fontFamily: SANS }}
          >
            03 &mdash; Before you redesign
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h2
            className="mt-8 md:mt-10 font-medium tracking-[-0.022em]"
            style={{
              fontFamily: SERIF,
              fontSize: 'clamp(2.4rem, 6.5vw, 5.8rem)',
              lineHeight: 0.96,
              color: '#fff',
              maxWidth: '18ch',
            }}
          >
            New logo. New site. New visuals.{' '}
            <span style={{ fontStyle: 'italic', color: '#fff' }}>Same problem underneath.</span>
          </h2>
        </Reveal>

        <div className="mt-16 md:mt-24 grid md:grid-cols-12 gap-10">
          <Reveal delay={140} className="md:col-span-7">
            <ul className="space-y-7 md:space-y-8">
              {points.map(({ lead, mark, trail }, i) => (
                <li
                  key={i}
                  className="text-[21px] md:text-[26px] leading-[1.35]"
                  style={{ color: '#fff', fontFamily: SANS }}
                >
                  {lead}
                  <Highlight color={YELLOW}>
                    <span style={{ color: INK }}>{mark}</span>
                  </Highlight>
                  {trail}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={220} className="md:col-span-4 md:col-start-9">
            <div
              className="relative"
              style={{ transform: 'rotate(-1.5deg)' }}
            >
              <p
                style={{
                  fontFamily: '"Permanent Marker", "Caveat", cursive',
                  fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
                  lineHeight: 1.0,
                  letterSpacing: '0.01em',
                  textTransform: 'uppercase',
                  color: '#fff',
                }}
              >
                You're guessing.<br />Not diagnosing.
              </p>
              <div className="mt-5 flex items-center gap-2">
                <HandArrow
                  style={{ width: 64, height: 40, transform: 'rotate(18deg)' }}
                  color="#fff"
                />
                <span
                  style={{
                    fontFamily: '"Caveat", cursive',
                    fontSize: '1.5rem',
                    color: '#fff',
                    transform: 'rotate(-3deg)',
                    display: 'inline-block',
                    opacity: 0.9,
                  }}
                >
                  that&rsquo;s the gap<br />we close
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// ─── Proof — big lead quote + supporting testimonial ───
function Proof() {
  return (
    <section id="proof" className="relative py-28 md:py-40" style={{ background: CREAM }}>
      <StarMark
        className="absolute hidden md:block"
        style={{ top: 80, left: '6%', width: 38, height: 38 }}
        color={TOMATO}
      />
      <StarMark
        className="absolute hidden md:block"
        style={{ bottom: 100, right: '8%', width: 30, height: 30, transform: 'rotate(20deg)' }}
        color={FOREST}
      />
      <div className="relative max-w-[1200px] mx-auto px-6 md:px-10">
        <Reveal>
          <p
            className="text-[11px] md:text-[12px] font-semibold tracking-[0.2em] uppercase"
            style={{ color: TOMATO, fontFamily: SANS }}
          >
            04 &mdash; Proof
          </p>
        </Reveal>
        <Reveal delay={100}>
          <blockquote
            className="mt-10 md:mt-12 font-medium tracking-[-0.018em]"
            style={{
              fontFamily: SERIF,
              fontSize: 'clamp(1.9rem, 5vw, 4.4rem)',
              lineHeight: 1.04,
              color: INK,
              maxWidth: '22ch',
            }}
          >
            &ldquo;I&rsquo;d already spent{' '}
            <Circled>$40k</Circled>{' '}on a rebrand that didn&rsquo;t move the needle. The diagnosis showed me — in one session — that my{' '}
            <span style={{ fontStyle: 'italic' }}>messaging</span> was the actual problem, not the visuals.&rdquo;
          </blockquote>
        </Reveal>
        <Reveal delay={200}>
          <div className="mt-10 flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-[16px] font-medium"
              style={{ background: INK, color: PAPER, fontFamily: SERIF }}
              aria-hidden="true"
            >
              J
            </div>
            <div>
              <p className="text-[14px] font-bold tracking-[0.02em]" style={{ color: INK, fontFamily: SANS }}>
                Jess R.
              </p>
              <p className="text-[13px]" style={{ color: INK_SOFT, fontFamily: SANS }}>
                Founder, B2B SaaS · $2.4M ARR
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={280}>
          <div
            className="mt-20 md:mt-24 pt-12 md:pt-16 grid md:grid-cols-2 gap-10 md:gap-16 border-t"
            style={{ borderColor: BORDER_INK }}
          >
            <div>
              <blockquote
                className="font-medium tracking-[-0.012em]"
                style={{
                  fontFamily: SERIF,
                  fontSize: 'clamp(1.3rem, 2.4vw, 1.85rem)',
                  lineHeight: 1.28,
                  color: INK,
                  fontStyle: 'italic',
                }}
              >
                &ldquo;Three rebrand pitches later, I still didn&rsquo;t know what was broken. The diagnosis took 90 minutes and told me more than six months of discovery calls.&rdquo;
              </blockquote>
              <p className="mt-5 text-[13px] font-bold tracking-[0.02em]" style={{ color: INK, fontFamily: SANS }}>
                Marc L.
              </p>
              <p className="text-[13px]" style={{ color: INK_SOFT, fontFamily: SANS }}>
                Founder, Hospitality Group · 4 venues
              </p>
            </div>
            <div>
              <blockquote
                className="font-medium tracking-[-0.012em]"
                style={{
                  fontFamily: SERIF,
                  fontSize: 'clamp(1.3rem, 2.4vw, 1.85rem)',
                  lineHeight: 1.28,
                  color: INK,
                  fontStyle: 'italic',
                }}
              >
                &ldquo;I was ready to hire a new agency. Clark told me not to. My team fixed the site structure ourselves, leads doubled in six weeks.&rdquo;
              </blockquote>
              <p className="mt-5 text-[13px] font-bold tracking-[0.02em]" style={{ color: INK, fontFamily: SANS }}>
                Priya K.
              </p>
              <p className="text-[13px]" style={{ color: INK_SOFT, fontFamily: SANS }}>
                CMO, Fintech · Series A
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── Founder ───
function Founder() {
  return (
    <section className="relative py-24 md:py-32" style={{ background: '#fff' }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-10 md:gap-16 items-start">
        <Reveal className="md:col-span-5">
          <div
            className="relative mx-auto md:mx-0"
            style={{
              width: 'clamp(220px, 30vw, 340px)',
              aspectRatio: '4 / 5',
              background: `linear-gradient(160deg, ${CREAM} 0%, ${PAPER} 60%, ${CREAM} 100%)`,
              border: `1.5px solid ${INK}`,
              borderRadius: 2,
              transform: 'rotate(-1.5deg)',
              boxShadow: `10px 10px 0 ${INK}`,
            }}
          >
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ fontFamily: SERIF, fontSize: 'clamp(4rem, 10vw, 8rem)', color: INK, letterSpacing: '-0.03em' }}
              aria-hidden="true"
            >
              CS
            </div>
            <div
              className="absolute"
              style={{
                bottom: -18,
                left: '50%',
                transform: 'translateX(-50%) rotate(-2deg)',
                background: YELLOW,
                border: `1.5px solid ${INK}`,
                padding: '6px 14px',
                fontFamily: '"Caveat", cursive',
                fontSize: '1.3rem',
                color: INK,
                whiteSpace: 'nowrap',
              }}
            >
              Clark, the actual designer
            </div>
          </div>
        </Reveal>

        <Reveal delay={100} className="md:col-span-7">
          <p
            className="text-[11px] md:text-[12px] font-semibold tracking-[0.2em] uppercase"
            style={{ color: TOMATO, fontFamily: SANS }}
          >
            06 &mdash; Who runs this
          </p>
          <h3
            className="mt-6 font-medium tracking-[-0.022em]"
            style={{
              fontFamily: SERIF,
              fontSize: 'clamp(2rem, 4.4vw, 3.4rem)',
              lineHeight: 1.02,
              color: INK,
              maxWidth: '20ch',
            }}
          >
            One designer.<br />Fifteen years.<br />No junior handoffs.
          </h3>
          <div
            className="mt-7 space-y-5 text-[17px] md:text-[18px] leading-[1.55]"
            style={{ color: INK_SOFT, fontFamily: SANS, maxWidth: '52ch' }}
          >
            <p>
              Every diagnosis is run by me — Clark Spendelow. No account manager, no strategist-behind-the-curtain, no deck from a team you&rsquo;ll never meet again.
            </p>
            <p>
              I&rsquo;ve shipped brand and web work since 2010 across{' '}
              <span style={{ color: INK, fontWeight: 600 }}>SaaS, hospitality, fintech, retail and DTC</span>.
              I&rsquo;ve sat on both sides of the rebrand table — as the studio selling it, and as the advisor telling founders to stop.
            </p>
            <p>
              The diagnosis is what I wish more founders had before they signed the proposal.
            </p>
          </div>
          <div className="mt-10 flex items-center gap-5">
            <span
              style={{
                fontFamily: '"Caveat", cursive',
                fontSize: 'clamp(2.2rem, 3.5vw, 2.8rem)',
                color: INK,
                lineHeight: 1,
                transform: 'rotate(-4deg)',
                display: 'inline-block',
              }}
            >
              — Clark
            </span>
            <span
              className="text-[12px] font-semibold tracking-[0.14em] uppercase"
              style={{ color: INK_SOFT, fontFamily: SANS }}
            >
              Founder, Brand Foundry Studio
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── Deliverables — what you walk away with ───
function Deliverables() {
  const items = [
    {
      label: 'The session',
      title: '90 minutes, live',
      body: 'A working session — not a discovery call. We go through your brand, site, messaging and funnel together, in real time.',
    },
    {
      label: 'The playbook',
      title: 'A 12-page written diagnosis',
      body: 'Delivered within 5 working days. Plain-language findings, annotated screenshots, and a clear argument for where attention should go.',
    },
    {
      label: 'The priorities',
      title: 'A ranked fix list',
      body: 'What to ship first, what to ship next, what to leave alone. Scoped so your team (or another studio) can run with it.',
    },
    {
      label: 'The follow-up',
      title: 'A 30-day Loom check-in',
      body: 'Once you&rsquo;ve shipped a change, I record a short video reviewing what moved and what still needs attention. Included.',
    },
  ]
  return (
    <section className="relative py-28 md:py-36" style={{ background: CREAM }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-10">
          <Reveal className="md:col-span-5">
            <p
              className="text-[11px] md:text-[12px] font-semibold tracking-[0.2em] uppercase"
              style={{ color: TOMATO, fontFamily: SANS }}
            >
              03.5 &mdash; What you walk away with
            </p>
            <h2
              className="mt-8 font-medium tracking-[-0.022em]"
              style={{
                fontFamily: SERIF,
                fontSize: 'clamp(2.2rem, 4.6vw, 3.6rem)',
                lineHeight: 1.0,
                color: INK,
                maxWidth: '14ch',
              }}
            >
              Not a deck.<br />
              <span style={{ fontStyle: 'italic' }}>A playbook</span> you&rsquo;ll actually use.
            </h2>
            <p
              className="mt-7 text-[16px] md:text-[17px] leading-[1.55]"
              style={{ color: INK_SOFT, fontFamily: SANS, maxWidth: '36ch' }}
            >
              Everything is delivered in writing, so you can forward it to a cofounder, a designer, or the agency you&rsquo;re about to brief.
            </p>
          </Reveal>

          <div className="md:col-span-7 md:col-start-6 grid sm:grid-cols-2 gap-5 md:gap-6">
            {items.map((d, i) => (
              <Reveal key={d.label} delay={i * 60}>
                <div
                  className="relative h-full p-7 md:p-8"
                  style={{
                    background: '#fff',
                    border: `1.5px solid ${INK}`,
                    borderRadius: 2,
                  }}
                >
                  <p
                    className="text-[10.5px] font-bold tracking-[0.2em] uppercase"
                    style={{ color: TOMATO, fontFamily: SANS }}
                  >
                    {d.label}
                  </p>
                  <h3
                    className="mt-4 font-medium tracking-[-0.012em]"
                    style={{
                      fontFamily: SERIF,
                      fontSize: '1.5rem',
                      lineHeight: 1.15,
                      color: INK,
                    }}
                  >
                    {d.title}
                  </h3>
                  <p
                    className="mt-3 text-[14.5px] leading-[1.55]"
                    style={{ color: INK_SOFT, fontFamily: SANS }}
                    dangerouslySetInnerHTML={{ __html: d.body }}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Logo wall — typographic brand names ───
function Logos() {
  // PLACEHOLDER — swap for real client names from Clark's 15+ year portfolio
  const brands = [
    'Northlight', 'Harbor Co.', 'Shift', 'Kinetic', 'Verse',
    'Groundwork', 'Lantern', 'Mercer & Co.', 'Parade', 'Atlas Bureau',
  ]
  return (
    <section className="relative py-20 md:py-24" style={{ background: '#fff' }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6 mb-10 md:mb-14">
            <div>
              <p
                className="text-[11px] md:text-[12px] font-semibold tracking-[0.2em] uppercase"
                style={{ color: TOMATO, fontFamily: SANS }}
              >
                05 &mdash; Brands shaped
              </p>
              <h2
                className="mt-6 font-medium tracking-[-0.018em]"
                style={{
                  fontFamily: SERIF,
                  fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)',
                  lineHeight: 1.1,
                  color: INK,
                  maxWidth: '26ch',
                }}
              >
                A few of the brands that have sat on the other side of this process.
              </h2>
            </div>
            <p
              className="text-[13px] font-semibold tracking-[0.14em] uppercase"
              style={{ color: INK_SOFT, fontFamily: SANS }}
            >
              2010 &rarr; today
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <ul
            className="grid grid-cols-2 md:grid-cols-5 border-t border-b"
            style={{ borderColor: BORDER_INK }}
          >
            {brands.map((b, i) => (
              <li
                key={b}
                className="py-8 md:py-10 px-3 text-center"
                style={{
                  fontFamily: SERIF,
                  fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                  color: INK,
                  letterSpacing: '-0.012em',
                  borderRight:
                    (i + 1) % 5 === 0 ? 'none' : `1px solid ${BORDER_INK}`,
                  borderBottom:
                    i >= 5 ? 'none' : `1px solid ${BORDER_INK}`,
                }}
              >
                {b}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

// ─── FAQ — editorial Q&A using native details/summary ───
function FAQ() {
  const faqs = [
    {
      q: 'Why not just hire an agency to rebrand?',
      a: "An agency sells you a rebrand because that's what they sell. A diagnosis doesn't — you might walk away being told not to rebrand at all. If that's the finding, you save yourself six figures and six months.",
    },
    {
      q: "What if my site isn't built yet?",
      a: "Even better. Diagnosing positioning and messaging before you build saves the most time. We'll map the foundation so the build has something specific to point at, instead of being the place you discover what you actually meant.",
    },
    {
      q: 'Can I share the playbook with my team?',
      a: "Yes. Up to three founders or execs can join the session live, and the written playbook is licensed to the business — forward it to your designer, your agency, your CMO, whoever needs it.",
    },
    {
      q: 'What if you tell me my brand is actually fine?',
      a: "That's a real outcome — it happened to three clients last year. You'll leave with clarity on what to stop worrying about, and a ranked list of the smaller things worth fixing. Sometimes the most valuable outcome is being told not to spend the money.",
    },
    {
      q: 'Do you also do the redesign work afterward?',
      a: "Selectively, and only after the diagnosis. If the real fix is a messaging rewrite or a structural rethink, I may not be the right person — and I'll tell you who is. The diagnosis is the product; the redesign is a possible next step, never a bundled upsell.",
    },
    {
      q: 'How fast can we book a session?',
      a: "Usually 7–14 days out. I run two diagnoses per week, max. Every application is reviewed personally to make sure we'll actually be useful to each other.",
    },
  ]
  return (
    <section id="faq" className="relative py-28 md:py-36" style={{ background: PAPER }}>
      <div className="max-w-[1080px] mx-auto px-6 md:px-10">
        <Reveal>
          <p
            className="text-[11px] md:text-[12px] font-semibold tracking-[0.2em] uppercase"
            style={{ color: TOMATO, fontFamily: SANS }}
          >
            07 &mdash; FAQ
          </p>
          <h2
            className="mt-8 font-medium tracking-[-0.022em]"
            style={{
              fontFamily: SERIF,
              fontSize: 'clamp(2.2rem, 5vw, 4rem)',
              lineHeight: 1.0,
              color: INK,
              maxWidth: '18ch',
            }}
          >
            The questions founders ask before they apply.
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div
            className="mt-14 md:mt-16 border-t"
            style={{ borderColor: INK }}
          >
            {faqs.map((f) => (
              <details
                key={f.q}
                className="v4-faq group"
                style={{ borderBottom: `1px solid ${INK}` }}
              >
                <summary
                  className="cursor-pointer list-none flex items-start gap-6 py-7 md:py-8"
                  style={{ fontFamily: SERIF, color: INK }}
                >
                  <span
                    className="v4-faq-mark shrink-0 font-medium"
                    style={{
                      fontSize: '1.6rem',
                      lineHeight: 1,
                      color: TOMATO,
                      width: '1.2em',
                      transition: 'transform 280ms cubic-bezier(0.3, 0.9, 0.35, 1)',
                    }}
                    aria-hidden="true"
                  >
                    +
                  </span>
                  <span
                    className="font-medium tracking-[-0.012em]"
                    style={{
                      fontSize: 'clamp(1.15rem, 2vw, 1.5rem)',
                      lineHeight: 1.2,
                    }}
                  >
                    {f.q}
                  </span>
                </summary>
                <div
                  className="pl-[calc(1.2em+1.5rem)] pb-7 md:pb-8 pr-4 text-[16px] md:text-[17px] leading-[1.6]"
                  style={{ color: INK_SOFT, fontFamily: SANS, maxWidth: '68ch' }}
                >
                  {f.a}
                </div>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── Final CTA — dark close ───
function CTA() {
  return (
    <section
      id="apply"
      className="relative py-28 md:py-40 overflow-hidden"
      style={{ background: DARK, color: '#fff' }}
    >
      <StarMark
        className="absolute"
        style={{ top: 80, right: '10%', width: 44, height: 44, opacity: 0.6 }}
        color={YELLOW}
      />
      <StarMark
        className="absolute"
        style={{ bottom: 120, left: '8%', width: 30, height: 30, opacity: 0.5, transform: 'rotate(22deg)' }}
        color={TOMATO}
      />
      <div className="relative max-w-[1100px] mx-auto px-6 md:px-10 text-center">
        <Reveal>
          <p
            className="text-[11px] md:text-[12px] font-semibold tracking-[0.24em] uppercase"
            style={{ color: YELLOW, fontFamily: SANS }}
          >
            Apply for a diagnosis
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h2
            className="mt-8 md:mt-10 font-medium tracking-[-0.026em] mx-auto"
            style={{
              fontFamily: SERIF,
              fontSize: 'clamp(2.6rem, 7vw, 6.6rem)',
              lineHeight: 0.96,
              color: '#fff',
              maxWidth: '18ch',
            }}
          >
            Stop guessing.{' '}
            <span style={{ fontStyle: 'italic' }}>Start diagnosing.</span>
          </h2>
        </Reveal>
        <Reveal delay={180}>
          <p
            className="mt-8 mx-auto text-[17px] md:text-[19px] leading-[1.55]"
            style={{ color: 'rgba(255,255,255,0.68)', fontFamily: SANS, maxWidth: '56ch' }}
          >
            Every application is reviewed personally. If we&rsquo;re not a fit, I&rsquo;ll tell you.
            If we are, you&rsquo;ll have clarity in a week.
          </p>
        </Reveal>
        <Reveal delay={260}>
          <div className="mt-12">
            <YellowButton size="large">Apply for a Diagnosis</YellowButton>
            <p
              className="mt-5 text-[12px] tracking-[0.06em] uppercase font-semibold"
              style={{ color: 'rgba(255,255,255,0.4)', fontFamily: SANS }}
            >
              One session · 90 minutes · Written playbook
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── Footer ───
function Footer() {
  return (
    <footer style={{ background: INK, color: 'rgba(255,255,255,0.72)' }}>
      <div className="max-w-[1320px] mx-auto px-6 md:px-10 py-10 flex flex-wrap gap-6 items-center justify-between text-[12px] tracking-[0.06em] uppercase font-semibold" style={{ fontFamily: SANS }}>
        <Wordmark onDark />
        <span>&copy; Brand Foundry Studio · Est. 2010</span>
        <div className="flex gap-5">
          <a href="#">Instagram</a>
          <a href="#">LinkedIn</a>
          <a href="mailto:design@clrk.studio">Email</a>
        </div>
      </div>
    </footer>
  )
}

export default function LandingPageV4() {
  return (
    <>
      <style>{`
        html { scroll-behavior: smooth; }
        body { background: ${PAPER}; }

        /* Highlight — marker stroke that draws in on scroll */
        .v4-hl {
          color: inherit;
          padding: 0.04em 3px;
          background-repeat: no-repeat, no-repeat;
          background-position: 0 84%, 0 66%;
          background-size: 0% 46%, 0% 66%;
          background-image:
            linear-gradient(100deg, color-mix(in oklab, var(--hl) 0%, transparent) 0%, color-mix(in oklab, var(--hl) 82%, transparent) 3%, color-mix(in oklab, var(--hl) 96%, transparent) 50%, color-mix(in oklab, var(--hl) 82%, transparent) 97%, color-mix(in oklab, var(--hl) 0%, transparent) 100%),
            linear-gradient(97deg, color-mix(in oklab, var(--hl) 0%, transparent) 0%, color-mix(in oklab, var(--hl) 42%, transparent) 5%, color-mix(in oklab, var(--hl) 55%, transparent) 95%, color-mix(in oklab, var(--hl) 0%, transparent) 100%);
          -webkit-box-decoration-break: clone;
          box-decoration-break: clone;
          transition: background-size 1000ms cubic-bezier(0.3, 0.82, 0.4, 1);
        }
        .v4-hl.is-drawn { background-size: 100% 46%, 100% 66%; }
        [data-figma-capture="true"] .v4-hl {
          background-size: 100% 46%, 100% 66% !important;
          transition: none !important;
        }
        @media (prefers-reduced-motion: reduce) {
          .v4-hl { transition: none; }
        }

        /* Margin scribble */
        .v4-notthis {
          position: relative;
          display: inline;
          white-space: nowrap;
        }
        .v4-notthis-note {
          font-family: "Caveat", cursive;
          font-weight: 600;
          color: ${TOMATO};
          font-size: 0.58em;
          line-height: 1;
          margin-left: 0.3em;
          display: inline-block;
          transform: translateY(-0.1em) rotate(-7deg);
          opacity: 0;
          transition: opacity 480ms ease-out, transform 540ms cubic-bezier(0.32, 0.9, 0.38, 1);
          pointer-events: none;
        }
        .v4-notthis.is-drawn .v4-notthis-note {
          opacity: 0.92;
          transform: translateY(-0.38em) rotate(-7deg);
        }
        [data-figma-capture="true"] .v4-notthis-note {
          opacity: 0.92 !important;
          transform: translateY(-0.38em) rotate(-7deg) !important;
          transition: none !important;
        }
        @media (prefers-reduced-motion: reduce) {
          .v4-notthis-note { transition: none; }
        }

        /* Hand-drawn circle */
        .v4-circled {
          position: relative;
          display: inline-block;
          padding: 0 0.15em;
        }
        .v4-circled-word { position: relative; z-index: 1; }
        .v4-circled-svg {
          position: absolute;
          inset: -18% -8% -18% -8%;
          width: 116%;
          height: 136%;
          pointer-events: none;
          overflow: visible;
        }
        .v4-circled-svg path {
          fill: none;
          stroke: ${TOMATO};
          stroke-width: 2.2;
          stroke-linecap: round;
          stroke-linejoin: round;
          vector-effect: non-scaling-stroke;
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          opacity: 0.9;
          transition: stroke-dashoffset 900ms cubic-bezier(0.38, 0.9, 0.35, 1);
        }
        .v4-circled.is-drawn .v4-circled-svg path {
          stroke-dashoffset: 0;
        }
        [data-figma-capture="true"] .v4-circled-svg path {
          stroke-dashoffset: 0 !important;
          transition: none !important;
        }
        @media (prefers-reduced-motion: reduce) {
          .v4-circled-svg path { transition: none; }
        }

        .v3-reveal {
          will-change: transform, opacity;
        }
        [data-figma-capture="true"] .v3-reveal {
          opacity: 1 !important;
          transform: none !important;
          transition: none !important;
        }

        /* FAQ details/summary styling */
        .v4-faq summary::-webkit-details-marker { display: none; }
        .v4-faq[open] .v4-faq-mark { transform: rotate(45deg); }
      `}</style>
      <main>
        <Hero />
        <Argument />
        <Process />
        <Deliverables />
        <Pain />
        <Proof />
        <Logos />
        <Founder />
        <FAQ />
        <CTA />
        <Footer />
      </main>
    </>
  )
}
