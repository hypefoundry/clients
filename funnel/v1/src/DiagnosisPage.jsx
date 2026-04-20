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
          href="#pricing"
          className="text-xs font-semibold tracking-[0.1em] uppercase text-highlight hover:text-highlight-hover transition-colors"
        >
          Book a Diagnosis
        </a>
      </div>
    </nav>
  )
}

function Button({ children, href = '#pricing', size = 'default', className = '' }) {
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
  return (
    <Section className="pt-36 pb-20 md:pt-52 md:pb-28">
      <Reveal>
        <h1 className="text-[clamp(2.6rem,6vw,4.2rem)] leading-[1.06] tracking-[-0.03em] font-bold mb-8">
          Find out what's actually not working.
        </h1>
      </Reveal>
      <Reveal delay={80}>
        <p className="text-lg md:text-xl text-text-muted leading-relaxed mb-10 max-w-[540px] mx-auto">
          Before you invest in another redesign, get clarity on what's broken — and what to fix.
        </p>
      </Reveal>
      <Reveal delay={160}>
        <Button size="large">Book a Brand Diagnosis</Button>
        <p className="text-xs text-text-muted mt-5 tracking-wide">
          No pressure. No obligation to rebuild.
        </p>
      </Reveal>
    </Section>
  )
}

function Problem() {
  const points = [
    "It's not converting",
    "The messaging doesn't land",
    "You're not confident in what to change",
    "You're considering another redesign",
  ]

  return (
    <Section className="py-24 md:py-32" variant="alt">
      <Reveal>
        <Eyebrow>The problem</Eyebrow>
        <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.12] tracking-[-0.02em] font-bold mb-10">
          Most businesses guess.
        </h2>
      </Reveal>
      <Reveal>
        <div className="max-w-[520px] mx-auto space-y-5 mb-12">
          <p className="text-base md:text-lg text-text-muted leading-relaxed">
            You've probably already invested in design.
          </p>
          <p className="text-base md:text-lg text-text-muted leading-relaxed">
            A website. A brand. Maybe both.
          </p>
          <p className="text-base md:text-lg text-text leading-relaxed font-medium">
            And something still feels off.
          </p>
        </div>
      </Reveal>
      <Reveal>
        <div className="max-w-[420px] mx-auto text-left mb-12">
          {points.map((point, i) => (
            <div key={i} className="flex items-start gap-4 py-3.5 border-b border-border last:border-0">
              <span className="w-2 h-2 rounded-full bg-highlight mt-2 shrink-0" />
              <p className="text-base md:text-lg text-text leading-relaxed">{point}</p>
            </div>
          ))}
        </div>
      </Reveal>
      <Reveal>
        <p className="text-xl md:text-2xl font-bold text-text tracking-[-0.01em]">
          You're trying to fix things without knowing what's actually broken.
        </p>
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
          More design won't fix the wrong problem
        </h2>
      </Reveal>
      <Reveal>
        <div className="max-w-[520px] mx-auto space-y-5 mb-14">
          <p className="text-base md:text-lg text-text-muted leading-relaxed">
            Most people respond to underperformance the same way:
          </p>
          <p className="text-base md:text-lg text-text leading-relaxed font-medium">
            They redesign. Again.
          </p>
          <p className="text-base md:text-lg text-text-muted leading-relaxed">
            New visuals. New layout. New assets.
          </p>
          <p className="text-base md:text-lg text-text-muted leading-relaxed">
            But if the underlying clarity isn't there, nothing improves.
          </p>
        </div>
        <p className="text-2xl md:text-3xl font-bold leading-snug text-text tracking-[-0.02em] max-w-[600px] mx-auto">
          Fixing design without clarity is just expensive guessing.
        </p>
      </Reveal>
    </Section>
  )
}

function Offer() {
  const items = ['Positioning', 'Messaging', 'Structure', 'User flow', 'Conversion friction']

  return (
    <Section className="py-24 md:py-32" variant="dark">
      <Reveal>
        <Eyebrow>The offer</Eyebrow>
        <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.12] tracking-[-0.02em] font-bold mb-6 text-white">
          Start with a Brand Diagnosis
        </h2>
        <p className="text-base md:text-lg text-white/60 leading-relaxed mb-4 max-w-[540px] mx-auto">
          A focused session where we analyse your brand, messaging, and website to identify exactly what's not working — and why.
        </p>
        <p className="text-base text-white/80 font-medium mb-10 max-w-[540px] mx-auto">
          This isn't a surface-level review.
        </p>
      </Reveal>
      <Reveal>
        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/40 mb-6">A structured breakdown of</p>
        <div className="max-w-[320px] mx-auto mb-12">
          {items.map((item, i) => (
            <div key={i} className="flex items-baseline gap-4 py-3 border-b border-white/10 last:border-0">
              <span className="text-highlight font-bold text-xs tabular-nums shrink-0">0{i + 1}</span>
              <p className="text-base text-white/90 text-left">{item}</p>
            </div>
          ))}
        </div>
        <p className="text-xl md:text-2xl font-bold text-white tracking-[-0.01em] max-w-[520px] mx-auto">
          So you can stop guessing, and start making the right decisions.
        </p>
      </Reveal>
    </Section>
  )
}

function WhatYouGet() {
  const items = [
    "A clear understanding of what's broken",
    "The root cause of performance issues",
    "Specific, actionable recommendations",
    "Clarity on whether you actually need a redesign",
    "Direction on what to do next",
  ]

  return (
    <Section className="py-24 md:py-32" variant="alt">
      <Reveal>
        <Eyebrow>Deliverables</Eyebrow>
        <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.12] tracking-[-0.02em] font-bold mb-14">
          What you'll walk away with
        </h2>
      </Reveal>
      <Reveal>
        <div className="max-w-[480px] mx-auto text-left mb-12">
          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-4 py-3.5 border-b border-border last:border-0">
              <span className="text-highlight text-sm mt-0.5 shrink-0">&#10003;</span>
              <p className="text-base md:text-lg text-text leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </Reveal>
      <Reveal>
        <p className="text-xl md:text-2xl font-bold text-text tracking-[-0.01em]">
          No fluff. No generic feedback. Just clarity.
        </p>
      </Reveal>
    </Section>
  )
}

function Process() {
  const steps = [
    { num: '01', title: 'Submit your business', desc: 'Share your website and a bit of context' },
    { num: '02', title: 'Deep dive analysis', desc: 'We review your brand, messaging, and structure' },
    { num: '03', title: 'Diagnosis session', desc: "We walk through what's not working — and what to fix" },
    { num: '04', title: 'Clear next steps', desc: 'You leave knowing exactly what to do' },
  ]

  return (
    <SectionWide className="py-24 md:py-32">
      <Reveal>
        <Eyebrow>Process</Eyebrow>
        <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.12] tracking-[-0.02em] font-bold mb-16">
          Simple, focused, effective
        </h2>
      </Reveal>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 max-w-[900px] mx-auto">
        {steps.map((step, i) => (
          <Reveal key={i} delay={i * 80}>
            <div className="text-center px-2">
              <div className="w-14 h-14 rounded-full border-2 border-text flex items-center justify-center mx-auto mb-5">
                <span className="text-sm font-bold text-text">{step.num}</span>
              </div>
              <h3 className="text-base font-bold text-text mb-2">{step.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed">{step.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionWide>
  )
}

function WhoFor() {
  const forItems = [
    "You've already invested in your brand or website",
    "You're not seeing the results you expected",
    "You're considering a redesign but unsure if it's the right move",
    "You want clarity before spending more money",
    "You're serious about improving performance",
  ]
  const notForItems = [
    "You're just looking for someone to make something look better",
    "You want quick design work without thinking",
    "You're not open to strategic feedback",
    "You're very early-stage with no real business context yet",
  ]

  return (
    <SectionWide className="py-24 md:py-32" variant="alt">
      <Reveal>
        <Eyebrow>Fit</Eyebrow>
      </Reveal>
      <div className="grid md:grid-cols-2 gap-8 md:gap-10 max-w-[800px] mx-auto">
        <Reveal>
          <div className="bg-white p-8 md:p-10 rounded-xl border-2 border-text text-left h-full">
            <h2 className="text-xl font-bold text-text mb-8">This is for you if:</h2>
            <div className="space-y-4">
              {forItems.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-highlight font-bold text-sm mt-0.5 shrink-0">+</span>
                  <p className="text-sm text-text leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="bg-bg-alt p-8 md:p-10 rounded-xl border border-border text-left h-full">
            <h2 className="text-xl font-bold text-text-muted mb-8">This isn't for you if:</h2>
            <div className="space-y-4">
              {notForItems.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-text-muted text-sm mt-0.5 shrink-0">—</span>
                  <p className="text-sm text-text-muted leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </SectionWide>
  )
}

function TrustAuthority() {
  return (
    <Section className="py-24 md:py-32">
      <Reveal>
        <Eyebrow>Trust</Eyebrow>
        <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.12] tracking-[-0.02em] font-bold mb-10">
          Why this works
        </h2>
      </Reveal>
      <Reveal>
        <div className="max-w-[540px] mx-auto mb-12">
          <p className="text-base md:text-lg text-text-muted leading-relaxed mb-5">
            After 15+ years working across branding, websites, and digital design, the pattern is always the same:
          </p>
          <p className="text-base md:text-lg text-text leading-relaxed font-semibold mb-10">
            Businesses jump into execution before understanding the problem.
          </p>
          <p className="text-lg text-text-muted mb-2">This flips that.</p>
          <p className="text-2xl md:text-3xl font-bold text-text tracking-[-0.02em]">
            Clarity first. Then execution.
          </p>
        </div>
      </Reveal>

      <Divider />

      <Reveal>
        <div className="pt-14">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-text-muted mb-3">Coming soon</p>
          <p className="text-sm text-text-muted">
            Client results and case studies will be published here.
          </p>
        </div>
      </Reveal>
    </Section>
  )
}

function FAQ() {
  const faqs = [
    { q: 'Do I need a full redesign?', a: "Not always. Sometimes small changes fix bigger issues." },
    { q: 'Is this just a sales call?', a: "No. This is a working session. You'll leave with real, actionable insight." },
    { q: 'What happens after the session?', a: "You can implement the recommendations yourself or work with us — no pressure either way." },
    { q: "Will I get something tangible?", a: "Yes — clear direction and actionable steps you can use immediately." },
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

function Pricing() {
  const includes = [
    '60–90 minute working session',
    'Pre-session analysis',
    'Clear, actionable direction',
  ]

  return (
    <Section className="py-24 md:py-32" id="pricing">
      <Reveal>
        <Eyebrow>Investment</Eyebrow>
        <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.12] tracking-[-0.02em] font-bold mb-14">
          Brand Diagnosis
        </h2>
      </Reveal>
      <Reveal>
        <div className="max-w-[480px] mx-auto">
          <div className="border-2 border-text rounded-xl p-10 md:p-12 mb-8">
            <p className="text-[clamp(2.4rem,5vw,3.4rem)] font-bold text-text tracking-[-0.03em] mb-2">
              $750
            </p>
            <p className="text-sm text-text-muted mb-8">AUD</p>

            <p className="text-base text-text-muted leading-relaxed mb-10 max-w-[380px] mx-auto">
              Before you invest thousands into redesigning your brand or website, get clarity on what's actually broken.
            </p>

            <div className="text-left max-w-[300px] mx-auto mb-10">
              {includes.map((item, i) => (
                <div key={i} className="flex items-start gap-3 py-2.5">
                  <span className="text-highlight text-sm mt-0.5 shrink-0">&#10003;</span>
                  <p className="text-base text-text">{item}</p>
                </div>
              ))}
            </div>

            <Button size="large" className="w-full text-center!">Book Your Diagnosis</Button>
            <p className="text-xs text-text-muted mt-5 tracking-wide">
              No pressure. No obligation to rebuild.
            </p>
          </div>

          <p className="text-lg font-bold text-text">
            One good decision here can save you thousands in the wrong direction.
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
        <Button size="large" className="bg-white! text-text! hover:bg-white/90! hover:text-text!">Book a Brand Diagnosis</Button>
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

export default function DiagnosisPage() {
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
        <Offer />
        <WhatYouGet />
        <Process />
        <WhoFor />
        <TrustAuthority />
        <FAQ />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
