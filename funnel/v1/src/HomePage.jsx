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
        <a href="/" className="text-base font-semibold tracking-tight text-text">Brand Foundry</a>
        <a
          href="#solution"
          className="text-xs font-semibold tracking-[0.1em] uppercase text-highlight hover:text-highlight-hover transition-colors"
        >
          Get a Diagnosis
        </a>
      </div>
    </nav>
  )
}

function Button({ children, href = '#solution', size = 'default', className = '' }) {
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

function Divider() {
  return <div className="max-w-[200px] mx-auto border-t border-border" />
}

// ─── Sections ───

function Hero() {
  return (
    <Section className="pt-36 pb-20 md:pt-52 md:pb-28">
      <Reveal>
        <h1 className="text-[clamp(2.6rem,6vw,4.2rem)] leading-[1.06] tracking-[-0.03em] font-bold mb-3">
          It's not a design problem.
        </h1>
        <p className="text-[clamp(2.6rem,6vw,4.2rem)] leading-[1.06] tracking-[-0.03em] font-bold mb-10 text-text-muted">
          It's a clarity problem.
        </p>
      </Reveal>
      <Reveal delay={80}>
        <p className="text-base md:text-lg text-text-muted leading-relaxed mb-2 max-w-[540px] mx-auto">
          Most businesses invest in branding and websites that should work — but don't.
        </p>
        <p className="text-base md:text-lg text-text leading-relaxed mb-10 max-w-[540px] mx-auto font-medium">
          We figure out what's actually broken, then fix it properly.
        </p>
      </Reveal>
      <Reveal delay={160}>
        <Button size="large">Get a Brand Diagnosis</Button>
        <p className="text-xs text-text-muted mt-5 tracking-wide">
          No pressure. No obligation to rebuild.
        </p>
      </Reveal>
    </Section>
  )
}

function Problem() {
  const points = [
    "You invested in a website but it's not converting",
    'Your brand feels inconsistent or "off"',
    "You've worked with a designer or developer... and it didn't fix anything",
    "Your competitors look sharper and more convincing",
    "You're making decisions without knowing what's actually wrong",
  ]

  return (
    <Section className="py-24 md:py-32" variant="alt">
      <Reveal>
        <Eyebrow>Sound familiar?</Eyebrow>
        <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.12] tracking-[-0.02em] font-bold mb-14">
          If this sounds familiar,<br />you're in the right place
        </h2>
      </Reveal>
      <Reveal>
        <div className="max-w-[520px] mx-auto text-left mb-12">
          {points.map((point, i) => (
            <div key={i} className="flex items-start gap-4 py-4 border-b border-border last:border-0">
              <span className="w-2 h-2 rounded-full bg-highlight mt-2 shrink-0" />
              <p className="text-base md:text-lg text-text leading-relaxed">{point}</p>
            </div>
          ))}
        </div>
      </Reveal>
      <Reveal>
        <p className="text-lg text-text-muted font-light">This isn't a design problem.</p>
        <p className="text-2xl text-text font-bold mt-2">It's a clarity problem.</p>
      </Reveal>
    </Section>
  )
}

function Reframe() {
  return (
    <Section className="py-24 md:py-32">
      <Reveal>
        <Eyebrow>The real issue</Eyebrow>
        <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.12] tracking-[-0.02em] font-bold mb-10">
          Most businesses fix the wrong thing
        </h2>
      </Reveal>
      <Reveal>
        <div className="max-w-[520px] mx-auto space-y-5 mb-14">
          <p className="text-base md:text-lg text-text-muted leading-relaxed">
            Most people jump straight into execution.
          </p>
          <p className="text-base md:text-lg text-text-muted leading-relaxed">
            New logo. New website. New assets.
          </p>
          <p className="text-base md:text-lg text-text-muted leading-relaxed">
            But if the underlying thinking is unclear, none of it performs.
          </p>
        </div>
        <p className="text-2xl md:text-3xl font-bold leading-snug text-text tracking-[-0.02em] max-w-[600px] mx-auto">
          Fixing design without clarity is just expensive guessing.
        </p>
      </Reveal>
    </Section>
  )
}

function Solution() {
  const items = [
    "Clear insight into what's broken",
    "Specific actions to fix it",
    "Direction on whether you even need a redesign",
  ]

  return (
    <Section className="py-24 md:py-32" variant="dark" id="solution">
      <Reveal>
        <Eyebrow>The solution</Eyebrow>
        <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.12] tracking-[-0.02em] font-bold mb-6 text-white">
          Start with clarity
        </h2>
        <p className="text-base md:text-lg text-white/60 leading-relaxed mb-4 max-w-[540px] mx-auto">
          We diagnose your brand, messaging, and website to identify exactly what's not working — and why.
        </p>
        <p className="text-base text-white/80 font-medium mb-12 max-w-[540px] mx-auto">
          So you can stop guessing, and start fixing the right things.
        </p>
      </Reveal>
      <Reveal>
        <div className="max-w-[440px] mx-auto mb-12">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/40 mb-6">What you get</p>
          {items.map((item, i) => (
            <div key={i} className="flex items-baseline gap-4 py-3.5 border-b border-white/10 last:border-0">
              <span className="text-highlight font-bold text-xs tabular-nums shrink-0">0{i + 1}</span>
              <p className="text-base md:text-lg text-white/90 leading-relaxed text-left">{item}</p>
            </div>
          ))}
        </div>
        <Button className="bg-white! text-text! hover:bg-white/90! hover:text-text!">Book Your Diagnosis</Button>
      </Reveal>
    </Section>
  )
}

function Process() {
  const steps = [
    { num: '01', title: 'Submit your business', desc: 'Quick context on your brand and website' },
    { num: '02', title: 'We diagnose the issues', desc: 'Brand, messaging, structure, conversion' },
    { num: '03', title: 'Get clear direction', desc: "What's wrong and what to do next" },
  ]

  return (
    <SectionWide className="py-24 md:py-32" variant="alt">
      <Reveal>
        <Eyebrow>Process</Eyebrow>
        <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.12] tracking-[-0.02em] font-bold mb-16">
          How it works
        </h2>
      </Reveal>
      <div className="grid md:grid-cols-3 gap-8 md:gap-12 max-w-[900px] mx-auto">
        {steps.map((step, i) => (
          <Reveal key={i} delay={i * 100}>
            <div className="text-center px-4">
              <div className="w-14 h-14 rounded-full border-2 border-text flex items-center justify-center mx-auto mb-5">
                <span className="text-sm font-bold text-text">{step.num}</span>
              </div>
              <h3 className="text-base font-bold text-text mb-2">{step.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed">{step.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <p className="text-sm text-text-muted mt-16 tracking-wide">
          No long retainers. No bloated process. Just clarity.
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
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-[700px] mx-auto">
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
      </Reveal>
    </SectionWide>
  )
}

function WhyBrandFoundry() {
  const points = [
    { title: "We don't jump into execution", desc: 'Most designers start making. We start by understanding.' },
    { title: "We find what's actually broken", desc: 'Not surface-level tweaks — real issues affecting performance.' },
    { title: 'We bridge strategy and execution', desc: 'No disconnect between thinking and doing.' },
    { title: 'We focus on outcomes, not aesthetics', desc: "It's not about looking better. It's about working better." },
  ]

  return (
    <SectionWide className="py-24 md:py-32" variant="alt">
      <Reveal>
        <Eyebrow>Why us</Eyebrow>
        <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.12] tracking-[-0.02em] font-bold mb-16">
          Why Brand Foundry
        </h2>
      </Reveal>
      <div className="grid sm:grid-cols-2 gap-8 md:gap-10 max-w-[800px] mx-auto">
        {points.map((point, i) => (
          <Reveal key={i} delay={i * 80}>
            <div className="text-left p-6 md:p-8 border border-border rounded-lg bg-white">
              <h3 className="text-base font-bold text-text mb-2">{point.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed">{point.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionWide>
  )
}

function AboutShort() {
  return (
    <Section className="py-24 md:py-32">
      <Reveal>
        <Eyebrow>About</Eyebrow>
        <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.12] tracking-[-0.02em] font-bold mb-3">
          I'm not here to make things look better.
        </h2>
        <p className="text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.12] tracking-[-0.02em] font-bold mb-10 text-text-muted">
          I'm here to make them work.
        </p>
      </Reveal>
      <Reveal>
        <div className="max-w-[540px] mx-auto">
          <p className="text-base md:text-lg text-text-muted leading-relaxed mb-5">
            After 15+ years in design, I've seen the same problem over and over:
          </p>
          <p className="text-base md:text-lg text-text leading-relaxed font-semibold mb-5">
            Businesses invest in branding and websites that should perform — but don't.
          </p>
          <p className="text-base md:text-lg text-text-muted leading-relaxed mb-5">
            Most of the time, it's not because the design is bad.
          </p>
          <p className="text-base md:text-lg text-text leading-relaxed font-medium mb-10">
            It's because the thinking isn't clear.
          </p>
          <p className="text-2xl font-bold text-text">
            That's the problem I solve.
          </p>
        </div>
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

export default function HomePage() {
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
        <Problem />
        <Reframe />
        <Solution />
        <Process />
        <Trust />
        <WhyBrandFoundry />
        <AboutShort />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
