import { useState, useEffect, useRef } from 'react'
import './index.css'

// ─── Theme ───
const ORANGE = '#ec5a14'
const ORANGE_DEEP = '#c84a0c'
const CREAM = '#f5efe6'
const INK = '#0c1418'
const INK_SOFT = '#5a5045'
const FONT = '"Bricolage Grotesque", "Inter", system-ui, sans-serif'

// ─── Reveal ───
function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('v2-revealed')
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
      className={`v2-reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}

// ─── Building blocks ───

function Card({ children, tone = 'cream', className = '', innerClass = '' }) {
  const tones = {
    cream: { background: CREAM, color: INK },
    ink: { background: INK, color: CREAM },
    orange: { background: ORANGE_DEEP, color: CREAM },
  }
  return (
    <Reveal>
      <article
        className={`relative overflow-hidden ${className}`}
        style={{
          ...tones[tone],
          borderRadius: 4,
        }}
      >
        <div className={`px-7 py-14 md:px-16 md:py-24 ${innerClass}`}>
          {children}
        </div>
      </article>
    </Reveal>
  )
}

function Wordmark({ tone = 'ink' }) {
  const fill = tone === 'ink' ? INK : CREAM
  return (
    <div className="inline-flex items-center gap-2.5">
      <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
        <path
          d="M11 1.5 L13 9 L20.5 11 L13 13 L11 20.5 L9 13 L1.5 11 L9 9 Z"
          fill={ORANGE}
          stroke={fill}
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className="text-[15px] font-semibold tracking-[-0.01em]"
        style={{ color: fill, fontFamily: FONT }}
      >
        Brand Foundry
      </span>
    </div>
  )
}

function PillButton({ children, href = '#diagnosis', tone = 'ink', className = '' }) {
  const styles =
    tone === 'ink'
      ? { background: INK, color: CREAM }
      : { background: CREAM, color: INK }
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2 px-7 py-3.5 text-[15px] font-medium transition-transform hover:-translate-y-0.5 active:translate-y-0 ${className}`}
      style={{ ...styles, fontFamily: FONT, borderRadius: 999 }}
    >
      {children}
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M2 7 L12 7 M8 3 L12 7 L8 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  )
}

function Eyebrow({ children, tone = 'ink' }) {
  return (
    <span
      className="inline-block text-[11px] font-semibold tracking-[0.18em] uppercase mb-6"
      style={{ color: tone === 'ink' ? ORANGE_DEEP : ORANGE, fontFamily: FONT }}
    >
      {children}
    </span>
  )
}

// ─── Nav ───

function Nav() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50">
      <div className="max-w-[1400px] mx-auto px-5 md:px-9 flex items-center justify-between h-16 md:h-18">
        <Wordmark tone="cream" />
        <span
          className="hidden sm:flex items-center gap-2.5"
          style={{ color: CREAM, fontFamily: FONT }}
          aria-label="Currently booking May 2026"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 rounded-full opacity-60 animate-ping" style={{ background: CREAM }} />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: CREAM }} />
          </span>
          <span className="text-[13px] font-medium leading-none tracking-[-0.005em]">
            now booking — May 2026
          </span>
        </span>
      </div>
    </nav>
  )
}

// ─── Hero ───

function Hero() {
  return (
    <Card className="!px-0 !py-0">
      <div className="px-7 pt-16 pb-14 md:px-20 md:pt-24 md:pb-20">
        <Wordmark tone="ink" />
        <h1
          className="mt-12 md:mt-16 font-bold tracking-[-0.03em]"
          style={{
            fontFamily: FONT,
            fontSize: 'clamp(2.4rem, 6.4vw, 4.6rem)',
            lineHeight: 0.98,
            color: INK,
            maxWidth: '14ch',
          }}
        >
          Your website isn't converting for a reason.
        </h1>
        <p
          className="mt-7 md:mt-8 text-[17px] md:text-[19px] leading-[1.55]"
          style={{ color: INK_SOFT, fontFamily: FONT, maxWidth: '46ch' }}
        >
          We diagnose what's actually broken across your brand, messaging, and website — so you can fix it properly.
        </p>
        <div className="mt-10 md:mt-12 flex items-center gap-5">
          <PillButton tone="ink">Get a Brand Diagnosis</PillButton>
          <span className="text-[13px]" style={{ color: INK_SOFT, fontFamily: FONT }}>
            No pressure. No obligation.
          </span>
        </div>
      </div>
    </Card>
  )
}

// ─── Video ───

function VideoCard() {
  const [playing, setPlaying] = useState(false)
  return (
    <Card className="!p-0" innerClass="!p-0">
      <div className="relative aspect-video" style={{ background: INK }}>
        {!playing ? (
          <button
            onClick={() => setPlaying(true)}
            className="absolute inset-0 w-full h-full flex flex-col items-center justify-center cursor-pointer border-0 group"
            style={{ background: 'transparent' }}
            aria-label="Play video"
          >
            <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at center, ${ORANGE}30, ${INK})` }} />
            <div
              className="relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
              style={{ background: ORANGE }}
            >
              <svg width="22" height="26" viewBox="0 0 22 26" fill="none" className="ml-1">
                <path d="M22 13L0 26V0L22 13Z" fill={CREAM} />
              </svg>
            </div>
            <p className="relative mt-6 text-[13px] tracking-wide" style={{ color: CREAM, fontFamily: FONT }}>
              Watch — 2 min
            </p>
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
    </Card>
  )
}

// ─── Pain points ───

function PainPoints() {
  const points = [
    { lead: "You've spent money on a site that ", mark: "doesn't convert", trail: "." },
    { lead: "Your messaging ", mark: "changes every time", trail: " someone new touches it." },
    { lead: "You've hired designers, developers, or agencies — and ", mark: "still feel stuck", trail: "." },
    { lead: "Your content gets published but ", mark: "doesn't connect", trail: "." },
    { lead: "You don't know what to fix next, so you ", mark: "fix everything", trail: "." },
  ]

  const highlight = {
    backgroundImage: `linear-gradient(180deg, transparent 56%, ${ORANGE} 56%, ${ORANGE} 92%, transparent 92%)`,
    color: INK,
    padding: '0 4px',
  }

  return (
    <Card>
      <Eyebrow>Before you redesign</Eyebrow>
      <h2
        className="font-bold tracking-[-0.025em]"
        style={{
          fontFamily: FONT,
          fontSize: 'clamp(1.8rem, 4.2vw, 3rem)',
          lineHeight: 1.05,
          color: INK,
          maxWidth: '22ch',
        }}
      >
        New logo. New site. New visuals. Same problem underneath.
      </h2>
      <ul className="mt-12 md:mt-14 space-y-5 md:space-y-6 max-w-[640px]">
        {points.map(({ lead, mark, trail }, i) => (
          <li
            key={i}
            className="text-[17px] md:text-[20px] leading-snug"
            style={{ color: INK, fontFamily: FONT }}
          >
            {lead}
            <span style={highlight}>{mark}</span>
            {trail}
          </li>
        ))}
      </ul>
      <p
        className="mt-14 md:mt-16 font-bold tracking-[-0.02em]"
        style={{
          fontFamily: FONT,
          fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
          lineHeight: 1.1,
          color: ORANGE_DEEP,
        }}
      >
        New design. Same diagnosis.
      </p>
    </Card>
  )
}

// ─── Reframe ───

function Reframe() {
  return (
    <Card>
      <Eyebrow>The cost of skipping diagnosis</Eyebrow>
      <h2
        className="font-bold tracking-[-0.025em]"
        style={{
          fontFamily: FONT,
          fontSize: 'clamp(1.8rem, 4.2vw, 3rem)',
          lineHeight: 1.05,
          color: INK,
          maxWidth: '20ch',
        }}
      >
        Every month without clarity costs you customers.
      </h2>
      <p
        className="mt-8 text-[17px] md:text-[19px] leading-[1.6]"
        style={{ color: INK_SOFT, fontFamily: FONT, maxWidth: '52ch' }}
      >
        Visitors leave in seconds. Leads go to competitors who communicate faster and clearer. Another rebrand won't fix it. Another agency won't either — not without understanding the root cause first.
      </p>

      <div className="mt-14 md:mt-16">
        <DivergeChart />
      </div>

      <p
        className="mt-14 md:mt-16 font-bold tracking-[-0.02em]"
        style={{
          fontFamily: FONT,
          fontSize: 'clamp(1.4rem, 2.6vw, 2rem)',
          lineHeight: 1.15,
          color: INK,
          maxWidth: '20ch',
        }}
      >
        You need a diagnosis before a prescription.
      </p>
    </Card>
  )
}

function DivergeChart() {
  return (
    <svg viewBox="0 0 800 380" className="w-full h-auto block" role="img" aria-label="Two paths diverge from today: with diagnosis curves up, without diagnosis drifts down" style={{ fontFamily: FONT }}>
      {/* Today dot */}
      <g transform="translate(120 200)">
        <circle r="7" fill={INK} />
        <text x="-18" y="34" fontSize="13" fontWeight="600" fill={INK_SOFT} letterSpacing="2">TODAY</text>
      </g>

      {/* WITH DIAGNOSIS — clean upward curve */}
      <path
        d="M 128 197 C 240 200, 340 165, 440 115 S 620 50, 720 38"
        fill="none"
        stroke={ORANGE}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <g transform="translate(720 38)">
        <path d="M 0 0 L -16 -7 M 0 0 L -16 7" stroke={ORANGE} strokeWidth="3.5" strokeLinecap="round" fill="none" />
      </g>
      <text x="540" y="22" fontSize="14" fontWeight="600" fill={INK} letterSpacing="1">
        WITH DIAGNOSIS
      </text>

      {/* WITHOUT — dashed downward */}
      <path
        d="M 128 203 C 240 210, 340 240, 440 280 S 620 340, 700 360"
        fill="none"
        stroke={INK}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="4 8"
        opacity="0.55"
      />
      <g transform="translate(700 360)">
        <path d="M 0 0 L -16 -7 M 0 0 L -16 7" stroke={INK} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.55" />
      </g>
      <text x="440" y="372" fontSize="13" fontWeight="500" fill={INK_SOFT} letterSpacing="1">
        WITHOUT DIAGNOSIS
      </text>

      {/* axis line */}
      <line x1="120" y1="200" x2="760" y2="200" stroke={INK} strokeWidth="1" opacity="0.15" />
      <text x="760" y="195" textAnchor="end" fontSize="11" fill={INK_SOFT} letterSpacing="2">SIX MONTHS →</text>
    </svg>
  )
}

// ─── Diagnosis offer ───

function DiagnosisOffer() {
  const items = [
    "A detailed breakdown of what's costing you conversions",
    "Specific actions to fix it — prioritised by impact",
    "An honest assessment of what's worth fixing — and what's not",
  ]
  return (
    <Card tone="ink" className="" >
      <div id="diagnosis" />
      <Eyebrow tone="cream">Brand Diagnosis</Eyebrow>
      <h2
        className="font-bold tracking-[-0.025em]"
        style={{
          fontFamily: FONT,
          fontSize: 'clamp(1.8rem, 4.2vw, 3rem)',
          lineHeight: 1.05,
          color: CREAM,
          maxWidth: '20ch',
        }}
      >
        Find out what's <span style={{ color: ORANGE }}>actually broken</span>.
      </h2>
      <p className="mt-7 text-[17px] md:text-[19px] leading-[1.55]" style={{ color: 'rgba(245,239,230,0.68)', fontFamily: FONT, maxWidth: '46ch' }}>
        We analyse your brand, messaging, and website — and tell you exactly what to fix first.
      </p>

      <div className="mt-12 md:mt-14 grid md:grid-cols-3 gap-6 md:gap-8 max-w-[860px]">
        {items.map((item, i) => (
          <div key={i} style={{ borderTop: `1px solid ${ORANGE}`, paddingTop: 18 }}>
            <span className="block text-[12px] font-semibold tracking-[0.16em]" style={{ color: ORANGE, fontFamily: FONT }}>
              0{i + 1}
            </span>
            <p className="mt-3 text-[15px] md:text-[16px] leading-[1.5]" style={{ color: CREAM, fontFamily: FONT }}>
              {item}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 md:mt-14 flex items-center gap-5">
        <PillButton tone="cream">Book Your Diagnosis</PillButton>
        <span className="text-[13px]" style={{ color: 'rgba(245,239,230,0.55)', fontFamily: FONT }}>
          No long proposal. Just clarity.
        </span>
      </div>
    </Card>
  )
}

// ─── Process ───

function Process() {
  const steps = [
    { n: '01', title: 'Submit your business', desc: 'Quick context on your brand and website.' },
    { n: '02', title: 'We diagnose the issues', desc: 'Brand, messaging, structure, conversion.' },
    { n: '03', title: 'Get clear direction', desc: "What's wrong and what to do next." },
  ]
  return (
    <Card>
      <Eyebrow>Process</Eyebrow>
      <h2
        className="font-bold tracking-[-0.025em]"
        style={{
          fontFamily: FONT,
          fontSize: 'clamp(1.8rem, 4.2vw, 3rem)',
          lineHeight: 1.05,
          color: INK,
          maxWidth: '14ch',
        }}
      >
        How it works.
      </h2>
      <div className="mt-12 md:mt-16 grid md:grid-cols-3 gap-8 md:gap-12">
        {steps.map((s, i) => (
          <div key={i}>
            <ProcessIllustration step={i + 1} />
            <span
              className="block mt-6 text-[12px] font-semibold tracking-[0.18em]"
              style={{ color: ORANGE_DEEP, fontFamily: FONT }}
            >
              {s.n}
            </span>
            <h3
              className="mt-2 font-semibold"
              style={{ color: INK, fontFamily: FONT, fontSize: '1.25rem', lineHeight: 1.2, letterSpacing: '-0.015em' }}
            >
              {s.title}
            </h3>
            <p className="mt-2 text-[15px] leading-[1.5]" style={{ color: INK_SOFT, fontFamily: FONT }}>
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </Card>
  )
}

function ProcessIllustration({ step }) {
  const stroke = ORANGE
  if (step === 1) {
    // Document being submitted
    return (
      <svg viewBox="0 0 120 90" className="w-[120px] h-[90px]" aria-hidden="true">
        <g stroke={stroke} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <rect x="14" y="14" width="48" height="62" rx="2" />
          <line x1="22" y1="28" x2="50" y2="28" />
          <line x1="22" y1="38" x2="46" y2="38" />
          <line x1="22" y1="48" x2="50" y2="48" />
          <path d="M 70 44 L 104 44 M 96 36 L 104 44 L 96 52" />
        </g>
      </svg>
    )
  }
  if (step === 2) {
    // Magnifier on grid
    return (
      <svg viewBox="0 0 120 90" className="w-[120px] h-[90px]" aria-hidden="true">
        <g stroke={stroke} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <line x1="14" y1="28" x2="80" y2="28" />
          <line x1="14" y1="44" x2="80" y2="44" />
          <line x1="14" y1="60" x2="80" y2="60" />
          <line x1="14" y1="76" x2="80" y2="76" />
          <line x1="22" y1="20" x2="22" y2="84" />
          <line x1="42" y1="20" x2="42" y2="84" />
          <line x1="62" y1="20" x2="62" y2="84" />
          <circle cx="76" cy="46" r="20" fill={CREAM} />
          <line x1="91" y1="61" x2="104" y2="74" strokeWidth="3" />
        </g>
      </svg>
    )
  }
  // Path with arrow
  return (
    <svg viewBox="0 0 120 90" className="w-[120px] h-[90px]" aria-hidden="true">
      <g stroke={stroke} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M 14 70 C 32 70, 38 30, 60 30 S 88 70, 106 50" />
        <path d="M 96 50 L 106 50 L 100 60" />
        <circle cx="14" cy="70" r="3" fill={stroke} />
      </g>
    </svg>
  )
}

// ─── Trust / Before-After ───

function Trust() {
  return (
    <Card>
      <Eyebrow>Transformation</Eyebrow>
      <h2
        className="font-bold tracking-[-0.025em]"
        style={{
          fontFamily: FONT,
          fontSize: 'clamp(1.8rem, 4.2vw, 3rem)',
          lineHeight: 1.05,
          color: INK,
          maxWidth: '16ch',
        }}
      >
        What changes after this.
      </h2>
      <div className="mt-12 md:mt-14 grid md:grid-cols-2 gap-5 md:gap-8 max-w-[820px]">
        <div className="p-8 md:p-10" style={{ background: 'rgba(12,20,24,0.04)', borderRadius: 4 }}>
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase" style={{ color: INK_SOFT, fontFamily: FONT }}>Before</span>
          <p className="mt-5 text-[17px] md:text-[19px] leading-[1.45]" style={{ color: INK_SOFT, fontFamily: FONT }}>
            "I think we need a redesign…"
          </p>
        </div>
        <div className="p-8 md:p-10" style={{ background: ORANGE, borderRadius: 4 }}>
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase" style={{ color: INK, fontFamily: FONT }}>After</span>
          <p className="mt-5 text-[17px] md:text-[19px] leading-[1.45] font-semibold" style={{ color: INK, fontFamily: FONT }}>
            "I know exactly what's wrong and what to do next."
          </p>
        </div>
      </div>
    </Card>
  )
}

// ─── FAQ ───

function FAQ() {
  const faqs = [
    { q: 'Do I need a full redesign?', a: 'Not always. Sometimes small changes fix bigger issues.' },
    { q: 'Is this a sales call?', a: "No. You'll leave with clear, actionable insight." },
    { q: 'What happens after?', a: 'You can implement yourself or work with us.' },
  ]
  return (
    <Card>
      <Eyebrow>FAQ</Eyebrow>
      <h2
        className="font-bold tracking-[-0.025em]"
        style={{
          fontFamily: FONT,
          fontSize: 'clamp(1.8rem, 4.2vw, 3rem)',
          lineHeight: 1.05,
          color: INK,
        }}
      >
        Questions.
      </h2>
      <div className="mt-12 max-w-[680px]">
        {faqs.map((f, i) => (
          <FAQItem key={i} q={f.q} a={f.a} />
        ))}
      </div>
    </Card>
  )
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  return (
    <div style={{ borderTop: `1px solid rgba(12,20,24,0.12)` }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 cursor-pointer border-0 text-left"
        style={{ background: 'transparent' }}
        aria-expanded={open}
      >
        <span className="text-[17px] md:text-[19px] font-semibold tracking-[-0.01em]" style={{ color: INK, fontFamily: FONT }}>
          {q}
        </span>
        <span
          className="text-2xl shrink-0 select-none transition-transform duration-300"
          style={{ color: ORANGE_DEEP, transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
        >
          +
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{ maxHeight: open ? `${ref.current?.scrollHeight || 200}px` : '0px' }}
      >
        <p ref={ref} className="text-[15px] md:text-[16px] leading-[1.6] pb-6 max-w-[56ch]" style={{ color: INK_SOFT, fontFamily: FONT }}>
          {a}
        </p>
      </div>
    </div>
  )
}

// ─── About / Letter ───

function About() {
  return (
    <Card>
      <div className="grid md:grid-cols-[180px_1fr] gap-10 md:gap-16 max-w-[860px]">
        <div>
          <Eyebrow>A note from</Eyebrow>
          <p
            className="font-bold tracking-[-0.02em]"
            style={{ color: INK, fontFamily: FONT, fontSize: 'clamp(1.8rem, 3.4vw, 2.4rem)', lineHeight: 1 }}
          >
            Clark
          </p>
          <p className="mt-2 text-[13px]" style={{ color: INK_SOFT, fontFamily: FONT }}>
            Founder, Brand Foundry
          </p>
        </div>
        <div className="space-y-5 text-[16px] md:text-[17px] leading-[1.7]" style={{ color: INK, fontFamily: FONT, maxWidth: '60ch' }}>
          <p>Hey, it's Clark.</p>
          <p>
            If you're here, chances are you've already invested real money into your brand or website. But something isn't pulling its weight — leads aren't converting, the messaging keeps shifting, or the whole thing feels off in a way you can't quite name.
          </p>
          <p>
            You didn't build a business to keep guessing what's broken. Or to spend another five figures on a redesign that might fix it. You want to know clearly what's working, what isn't, and what's worth doing about it.
          </p>
          <p>
            After 15+ years designing brands and websites, I kept seeing the same thing: most brands don't have a design problem. They have a clarity problem. And no amount of new visuals fixes it.
          </p>
          <p>
            So I stopped offering rebuilds as the first answer. Now I run a <strong style={{ color: ORANGE_DEEP }}>Brand Diagnosis</strong> instead. One focused session. You walk away knowing exactly where the issue is — and what's worth fixing first.
          </p>
        </div>
      </div>
    </Card>
  )
}

// ─── Final CTA ───

function FinalCTA() {
  return (
    <Card tone="orange">
      <h2
        className="font-bold tracking-[-0.03em]"
        style={{
          fontFamily: FONT,
          fontSize: 'clamp(2.4rem, 6vw, 4.4rem)',
          lineHeight: 0.98,
          color: CREAM,
          maxWidth: '14ch',
        }}
      >
        Stop guessing. Start diagnosing.
      </h2>
      <p
        className="mt-8 text-[17px] md:text-[19px] leading-[1.55]"
        style={{ color: 'rgba(245,239,230,0.78)', fontFamily: FONT, maxWidth: '46ch' }}
      >
        Get clarity before you invest another dollar into design or development.
      </p>
      <div className="mt-10 md:mt-12 flex items-center gap-5">
        <PillButton tone="cream">Get a Brand Diagnosis</PillButton>
        <span className="text-[13px]" style={{ color: 'rgba(245,239,230,0.65)', fontFamily: FONT }}>
          No obligation.
        </span>
      </div>
    </Card>
  )
}

function Footer() {
  return (
    <footer className="py-10">
      <div className="max-w-[1400px] mx-auto px-5 md:px-9 flex items-center justify-between">
        <span className="text-[12px]" style={{ color: 'rgba(245,239,230,0.7)', fontFamily: FONT }}>
          © 2026 Brand Foundry
        </span>
        <span className="text-[12px]" style={{ color: 'rgba(245,239,230,0.7)', fontFamily: FONT }}>
          Clarity before design.
        </span>
      </div>
    </footer>
  )
}

// ─── Page ───

export default function LandingPageV2() {
  return (
    <div style={{ background: ORANGE, minHeight: '100vh', fontFamily: FONT }}>
      <style>{`
        .v2-reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .v2-revealed {
          opacity: 1;
          transform: translateY(0);
        }
        body { background: ${ORANGE}; }
      `}</style>
      <Nav />
      <main className="pt-20 md:pt-24 pb-6">
        <div className="max-w-[1400px] mx-auto px-3 md:px-6 flex flex-col gap-4 md:gap-6">
          <Hero />
          <VideoCard />
          <PainPoints />
          <Reframe />
          <DiagnosisOffer />
          <Process />
          <Trust />
          <FAQ />
          <About />
          <FinalCTA />
        </div>
      </main>
      <Footer />
    </div>
  )
}
