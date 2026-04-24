import { useEffect, useRef, useState } from 'react'

// ─── Theme ───
const DISPLAY = '"Anton", "Bricolage Grotesque", "Hanken Grotesk", system-ui, sans-serif'
const SANS = '"Hanken Grotesk", "Inter", system-ui, sans-serif'
const SERIF = '"Bespoke Serif", "Source Serif 4", Georgia, serif'

const CREAM = '#f6efe1'
const CREAM_DEEP = '#efe6cd'
const PAPER = '#fbf7ec'
const INK = '#1a1814'
const INK_SOFT = '#5b554a'
const INK_MUTED = '#8a8373'
const BORDER = '#e3dbc5'
const BORDER_SOFT = '#ece4ce'
const DARK = '#0b0b0b'
const CHALK = '#e8e4d6'
const CHALK_SOFT = '#9a958a'
const BORDER_DARK = '#1f1f1d'
const RED = '#c92b1b'
const RED_HOVER = '#a72214'

// ─── Reveal ───
function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('apply-revealed')
          obs.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function Reveal({ children, className = '', delay = 0, as: As = 'div' }) {
  const ref = useReveal()
  return (
    <As
      ref={ref}
      className={`apply-reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </As>
  )
}

// ─── Building blocks ───
function Panel({ dark, children, padY = 'clamp(96px, 14vh, 160px)', id }) {
  return (
    <section
      id={id}
      style={{
        background: dark ? DARK : CREAM,
        color: dark ? CHALK : INK,
        padding: `${padY} 24px`,
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: 1120, margin: '0 auto', width: '100%' }}>{children}</div>
    </section>
  )
}

function RedCTA({ href = '#book', children, large = false }) {
  return (
    <a
      href={href}
      className="apply-cta"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        background: RED,
        color: '#fff',
        fontFamily: SANS,
        fontWeight: 600,
        fontSize: large ? 16 : 15,
        letterSpacing: '0.01em',
        padding: large ? '18px 28px' : '14px 22px',
        borderRadius: 999,
        textDecoration: 'none',
        lineHeight: 1,
        transition: 'background 180ms ease, transform 180ms ease',
      }}
    >
      <span>{children}</span>
      <span style={{ fontSize: '1.1em', marginTop: -1 }}>→</span>
    </a>
  )
}

function Eyebrow({ children, dark }) {
  return (
    <div
      style={{
        fontFamily: SANS,
        fontSize: 12,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: dark ? CHALK_SOFT : INK_MUTED,
        fontWeight: 600,
      }}
    >
      {children}
    </div>
  )
}

function Rule({ dark }) {
  return (
    <div
      aria-hidden
      style={{
        width: 48,
        height: 1,
        background: dark ? CHALK_SOFT : INK_MUTED,
        opacity: 0.5,
      }}
    />
  )
}

// ─── SECTION 1: Hero (editorial) ───
function Hero() {
  return (
    <Panel padY="clamp(120px, 18vh, 200px)">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(28px, 4vh, 44px)', maxWidth: 920 }}>
        <Reveal>
          <Eyebrow>Brand Foundry Studio — The Go / No-Go Audit</Eyebrow>
        </Reveal>

        <Reveal delay={80}>
          <h1
            style={{
              fontFamily: SERIF,
              fontSize: 'clamp(2.4rem, 5.4vw, 4.6rem)',
              lineHeight: 1.02,
              letterSpacing: '-0.012em',
              margin: 0,
              fontWeight: 500,
              maxWidth: '18ch',
            }}
          >
            Before you redesign anything,{' '}
            <em style={{ fontStyle: 'italic', color: RED }}>find out if you actually should.</em>
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p
            style={{
              fontFamily: SANS,
              fontSize: 'clamp(16px, 1.3vw, 19px)',
              lineHeight: 1.55,
              color: INK_SOFT,
              margin: 0,
              maxWidth: '56ch',
            }}
          >
            A focused review of your brand, messaging, and website — designed to tell you what's broken, what isn't, and what to fix next. Before you spend another $20k on the wrong thing.
          </p>
        </Reveal>

        <Reveal delay={220}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            <RedCTA large>Book the Audit</RedCTA>
            <span style={{ fontFamily: SANS, fontSize: 14, color: INK_MUTED }}>
              45 minutes · one written breakdown · $1,000 AUD
            </span>
          </div>
        </Reveal>
      </div>
    </Panel>
  )
}

// ─── SECTION 2: The Cycle (Anton peak #1) ───
function Cycle() {
  return (
    <Panel padY="clamp(80px, 12vh, 140px)">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(32px, 5vh, 56px)', alignItems: 'center', textAlign: 'center' }}>
        <Reveal>
          <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 'clamp(18px, 1.5vw, 22px)', lineHeight: 1.5, color: INK_SOFT, margin: 0, maxWidth: '48ch' }}>
            Most founders don't realise they're already in this cycle.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div
            style={{
              fontFamily: DISPLAY,
              fontSize: 'clamp(2rem, 5vw, 4.6rem)',
              lineHeight: 1,
              letterSpacing: '-0.005em',
              textTransform: 'uppercase',
              color: INK,
              maxWidth: '26ch',
            }}
          >
            DIY <Arrow /> Freelancer <Arrow /> Agency <Arrow />{' '}
            <span style={{ color: RED }}>Still not working</span>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <p
            style={{
              fontFamily: SANS,
              fontSize: 'clamp(15px, 1.2vw, 17px)',
              lineHeight: 1.6,
              color: INK_MUTED,
              margin: 0,
              maxWidth: '52ch',
            }}
          >
            You might not have done all of these yet. But if something still isn't clicking — you're already in it.
          </p>
        </Reveal>
      </div>
    </Panel>
  )
}

function Arrow() {
  return (
    <span aria-hidden style={{ display: 'inline-block', margin: '0 0.12em', opacity: 0.45 }}>
      →
    </span>
  )
}

// ─── SECTION 3: Problem (editorial) ───
function Problem() {
  const lines = ['The site isn\u2019t converting.', 'The message feels off.', 'The leads aren\u2019t right.']
  return (
    <Panel padY="clamp(96px, 12vh, 140px)">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'clamp(48px, 6vw, 96px)', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <Reveal>
            <Eyebrow>The diagnosis trap</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2
              style={{
                fontFamily: SERIF,
                fontSize: 'clamp(2rem, 3.8vw, 3.4rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.01em',
                margin: 0,
                fontWeight: 500,
                maxWidth: '14ch',
              }}
            >
              It <em style={{ fontStyle: 'italic' }}>looks</em> like a design problem.
            </h2>
          </Reveal>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, paddingTop: 12 }}>
          {lines.map((line, i) => (
            <Reveal key={line} delay={140 + i * 80}>
              <div
                style={{
                  fontFamily: SERIF,
                  fontSize: 'clamp(19px, 1.7vw, 24px)',
                  lineHeight: 1.35,
                  color: INK,
                  paddingBottom: 20,
                  borderBottom: `1px solid ${BORDER}`,
                }}
              >
                {line}
              </div>
            </Reveal>
          ))}
          <Reveal delay={420}>
            <p style={{ fontFamily: SANS, fontSize: 15, color: INK_MUTED, lineHeight: 1.6, margin: 0, marginTop: 8 }}>
              So you assume: <span style={{ color: INK, fontStyle: 'italic', fontFamily: SERIF }}>"I need to redesign this."</span>
            </p>
          </Reveal>
        </div>
      </div>
    </Panel>
  )
}

// ─── SECTION 4: Reframe (editorial) ───
function Reframe() {
  return (
    <Panel padY="clamp(96px, 12vh, 140px)">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(28px, 4vh, 44px)', maxWidth: 860 }}>
        <Reveal>
          <Rule />
        </Reveal>
        <Reveal delay={80}>
          <h2
            style={{
              fontFamily: SERIF,
              fontSize: 'clamp(2rem, 4.2vw, 3.8rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.01em',
              margin: 0,
              fontWeight: 500,
              maxWidth: '22ch',
            }}
          >
            Most of the time,{' '}
            <em style={{ fontStyle: 'italic', color: RED }}>that's the wrong move.</em>
          </h2>
        </Reveal>

        <Reveal delay={160}>
          <div
            style={{
              fontFamily: SERIF,
              fontSize: 'clamp(18px, 1.5vw, 22px)',
              lineHeight: 1.55,
              color: INK_SOFT,
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              maxWidth: '54ch',
            }}
          >
            <p style={{ margin: 0 }}>
              A better-looking brand won't fix unclear positioning or a weak offer.
            </p>
            <p style={{ margin: 0 }}>
              It just makes the problem more expensive.
            </p>
          </div>
        </Reveal>
      </div>
    </Panel>
  )
}

// ─── SECTION 5: Core Idea (DARK — the one hard cut, Anton peak #2) ───
function CoreIdea() {
  return (
    <Panel dark padY="clamp(120px, 16vh, 180px)">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(32px, 5vh, 56px)', maxWidth: 900 }}>
        <Reveal>
          <Eyebrow dark>The real question</Eyebrow>
        </Reveal>

        <Reveal delay={100}>
          <h2
            style={{
              fontFamily: DISPLAY,
              fontSize: 'clamp(2.8rem, 7vw, 6.4rem)',
              lineHeight: 0.98,
              letterSpacing: '-0.008em',
              textTransform: 'uppercase',
              margin: 0,
              color: '#fff',
              maxWidth: '14ch',
            }}
          >
            You don't need better design.
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <p
            style={{
              fontFamily: SERIF,
              fontSize: 'clamp(20px, 2vw, 28px)',
              lineHeight: 1.35,
              color: CHALK,
              margin: 0,
              maxWidth: '36ch',
              fontStyle: 'italic',
            }}
          >
            You need to know <span style={{ color: RED, fontStyle: 'normal', fontFamily: SANS, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', fontSize: '0.82em' }}>what's broken</span> — and what isn't.
          </p>
        </Reveal>
      </div>
    </Panel>
  )
}

// ─── SECTION 6: Offer ───
function Offer() {
  return (
    <Panel padY="clamp(96px, 12vh, 140px)">
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <Reveal>
          <div
            style={{
              background: PAPER,
              border: `1px solid ${BORDER}`,
              borderRadius: 20,
              padding: 'clamp(40px, 5vw, 64px)',
              display: 'flex',
              flexDirection: 'column',
              gap: 28,
            }}
          >
            <Eyebrow>The offer</Eyebrow>
            <h2
              style={{
                fontFamily: SERIF,
                fontSize: 'clamp(2rem, 3.6vw, 3.2rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.01em',
                margin: 0,
                fontWeight: 500,
              }}
            >
              The Go / No-Go Audit
            </h2>
            <p
              style={{
                fontFamily: SERIF,
                fontSize: 'clamp(17px, 1.4vw, 20px)',
                lineHeight: 1.55,
                color: INK_SOFT,
                margin: 0,
                maxWidth: '52ch',
              }}
            >
              A focused review of your brand, messaging, and website to determine whether a redesign is actually the right move — or whether you're about to repeat the same cycle.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <RedCTA>Book the Audit</RedCTA>
              <span style={{ fontFamily: SANS, fontSize: 13, color: INK_MUTED, letterSpacing: '0.04em' }}>
                45 min · written breakdown · $1,000 AUD
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </Panel>
  )
}

// ─── SECTION 7: What You Get ───
function WhatYouGet() {
  const items = [
    {
      n: '01',
      title: 'Pre-review',
      body: 'Before we speak, you send through your site, offer, and context. I review it in advance so the call starts at the diagnosis, not the intake.',
    },
    {
      n: '02',
      title: 'Live audit',
      body: 'A 45-minute session walking through what\u2019s actually breaking down — and what\u2019s being misdiagnosed as a design problem.',
    },
    {
      n: '03',
      title: 'Written breakdown',
      body: 'A post-call document with what to fix, what to leave alone, and your Go / No-Go recommendation on a redesign.',
    },
  ]
  return (
    <Panel padY="clamp(96px, 12vh, 140px)">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(48px, 7vh, 80px)' }}>
        <Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 720 }}>
            <Eyebrow>What you get</Eyebrow>
            <h2
              style={{
                fontFamily: SERIF,
                fontSize: 'clamp(2rem, 3.8vw, 3.4rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.01em',
                margin: 0,
                fontWeight: 500,
                maxWidth: '20ch',
              }}
            >
              Three deliverables. <em style={{ fontStyle: 'italic' }}>One decision.</em>
            </h2>
          </div>
        </Reveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 0,
            borderTop: `1px solid ${BORDER}`,
          }}
        >
          {items.map((item, i) => (
            <Reveal key={item.n} delay={i * 120}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                  padding: '40px 0',
                  paddingRight: 'clamp(16px, 3vw, 40px)',
                  borderBottom: `1px solid ${BORDER}`,
                  height: '100%',
                }}
              >
                <div
                  style={{
                    fontFamily: SERIF,
                    fontSize: 14,
                    letterSpacing: '0.18em',
                    color: RED,
                    textTransform: 'uppercase',
                    fontWeight: 600,
                  }}
                >
                  {item.n}
                </div>
                <h3
                  style={{
                    fontFamily: SERIF,
                    fontSize: 'clamp(20px, 1.8vw, 24px)',
                    lineHeight: 1.1,
                    margin: 0,
                    fontWeight: 500,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontFamily: SANS,
                    fontSize: 15,
                    lineHeight: 1.6,
                    color: INK_SOFT,
                    margin: 0,
                  }}
                >
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Panel>
  )
}

// ─── SECTION 8: Pricing (Anton peak #3) ───
function Pricing() {
  return (
    <Panel padY="clamp(96px, 12vh, 140px)">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'clamp(48px, 6vw, 96px)', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <Reveal>
            <Eyebrow>Investment</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <div
              style={{
                fontFamily: DISPLAY,
                fontSize: 'clamp(4rem, 10vw, 8rem)',
                lineHeight: 0.9,
                letterSpacing: '-0.01em',
                color: INK,
              }}
            >
              $1,000 <span style={{ color: INK_MUTED, fontSize: '0.55em' }}>AUD</span>
            </div>
          </Reveal>
          <Reveal delay={160}>
            <p
              style={{
                fontFamily: SERIF,
                fontStyle: 'italic',
                fontSize: 'clamp(18px, 1.5vw, 22px)',
                lineHeight: 1.5,
                color: INK_SOFT,
                margin: 0,
                maxWidth: '34ch',
              }}
            >
              A small decision compared to the cost of another wrong one.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div>
              <RedCTA>Book the Audit</RedCTA>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div
            style={{
              background: PAPER,
              border: `1px solid ${BORDER}`,
              borderRadius: 16,
              padding: 'clamp(28px, 3vw, 36px)',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}
          >
            <Eyebrow>Clear decision guarantee</Eyebrow>
            <p style={{ fontFamily: SERIF, fontSize: 'clamp(17px, 1.3vw, 19px)', lineHeight: 1.55, color: INK, margin: 0 }}>
              If you leave the audit unsure what to do next, I'll refund you.
            </p>
            <p style={{ fontFamily: SANS, fontSize: 14, lineHeight: 1.6, color: INK_MUTED, margin: 0 }}>
              The point of this is clarity. If I can't give you that, you shouldn't pay for it.
            </p>
          </div>
        </Reveal>
      </div>
    </Panel>
  )
}

// ─── SECTION 9: Final CTA + Form ───
function FinalCTA() {
  const [form, setForm] = useState({ name: '', email: '', company: '', stuck: '' })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const next = {}
    if (!form.name.trim()) next.name = 'Required'
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Valid email required'
    setErrors(next)
    if (Object.keys(next).length) return
    setSubmitted(true)
  }

  return (
    <Panel id="book" padY="clamp(96px, 14vh, 160px)">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 'clamp(48px, 6vw, 96px)', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(24px, 3vh, 36px)' }}>
          <Reveal>
            <Eyebrow>Book the audit</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2
              style={{
                fontFamily: SERIF,
                fontSize: 'clamp(2rem, 4vw, 3.6rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.01em',
                margin: 0,
                fontWeight: 500,
                maxWidth: '18ch',
              }}
            >
              Before you fund another round of{' '}
              <em style={{ fontStyle: 'italic', color: RED }}>the same cycle.</em>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p
              style={{
                fontFamily: SERIF,
                fontSize: 'clamp(17px, 1.4vw, 20px)',
                lineHeight: 1.55,
                color: INK_SOFT,
                margin: 0,
                maxWidth: '42ch',
              }}
            >
              Find out what's broken, what isn't, and what to fix next.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p
              style={{
                fontFamily: SANS,
                fontSize: 13,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: INK_MUTED,
                margin: 0,
              }}
            >
              One session · one breakdown · one clear next move.
            </p>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <form
            onSubmit={handleSubmit}
            style={{
              background: PAPER,
              border: `1px solid ${BORDER}`,
              borderRadius: 20,
              padding: 'clamp(32px, 4vw, 44px)',
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
            }}
          >
            {submitted ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <Eyebrow>Request received</Eyebrow>
                <h3 style={{ fontFamily: SERIF, fontSize: 'clamp(22px, 2vw, 28px)', lineHeight: 1.1, margin: 0, fontWeight: 500 }}>
                  Thanks — I'll be in touch within one business day.
                </h3>
                <p style={{ fontFamily: SANS, fontSize: 15, lineHeight: 1.6, color: INK_SOFT, margin: 0 }}>
                  You'll get a short reply with available audit times and the pre-work questionnaire.
                </p>
              </div>
            ) : (
              <>
                <FormField label="Name" name="name" value={form.name} error={errors.name} onChange={handleChange} />
                <FormField label="Email" name="email" type="email" value={form.email} error={errors.email} onChange={handleChange} />
                <FormField label="Company or project" name="company" value={form.company} onChange={handleChange} />
                <FormField label="What isn't clicking right now?" name="stuck" textarea value={form.stuck} onChange={handleChange} />
                <button
                  type="submit"
                  className="apply-submit"
                  style={{
                    background: RED,
                    color: '#fff',
                    fontFamily: SANS,
                    fontWeight: 600,
                    fontSize: 15,
                    letterSpacing: '0.01em',
                    padding: '16px 24px',
                    border: 'none',
                    borderRadius: 999,
                    cursor: 'pointer',
                    marginTop: 8,
                    transition: 'background 180ms ease',
                  }}
                >
                  Book the Audit →
                </button>
              </>
            )}
          </form>
        </Reveal>
      </div>
    </Panel>
  )
}

function FormField({ label, name, value, onChange, type = 'text', textarea = false, error }) {
  const common = {
    width: '100%',
    background: 'transparent',
    color: INK,
    fontFamily: SANS,
    fontSize: 16,
    padding: '12px 0',
    border: 'none',
    borderBottom: `1px solid ${error ? RED : BORDER}`,
    outline: 'none',
  }
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontFamily: SANS, fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: INK_MUTED, fontWeight: 600 }}>
        {label} {error && <span style={{ color: RED, letterSpacing: 0, textTransform: 'none', marginLeft: 8, fontWeight: 500 }}>— {error}</span>}
      </span>
      {textarea ? (
        <textarea name={name} value={value} onChange={onChange} rows={3} style={{ ...common, resize: 'vertical' }} />
      ) : (
        <input name={name} type={type} value={value} onChange={onChange} style={common} />
      )}
    </label>
  )
}

// ─── Footer ───
function Footer() {
  return (
    <footer
      style={{
        background: CREAM,
        color: INK_MUTED,
        padding: '32px 24px',
        borderTop: `1px solid ${BORDER}`,
      }}
    >
      <div
        style={{
          maxWidth: 1120,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
          fontFamily: SANS,
          fontSize: 13,
          letterSpacing: '0.04em',
        }}
      >
        <div style={{ fontFamily: SERIF, fontSize: 16, color: INK, fontWeight: 500 }}>
          Brand Foundry Studio
        </div>
        <div>© {new Date().getFullYear()} Brand Foundry Studio. Melbourne / remote.</div>
      </div>
    </footer>
  )
}

// ─── Styles ───
function ApplyStyles() {
  return (
    <style>{`
      html, body { background: ${CREAM}; }
      .apply-reveal {
        opacity: 0;
        transform: translateY(16px);
        transition: opacity 700ms cubic-bezier(0.2, 0.7, 0.2, 1), transform 700ms cubic-bezier(0.2, 0.7, 0.2, 1);
        will-change: opacity, transform;
      }
      .apply-revealed {
        opacity: 1;
        transform: translateY(0);
      }
      .apply-cta:hover {
        background: ${RED_HOVER} !important;
        transform: translateY(-1px);
      }
      .apply-submit:hover {
        background: ${RED_HOVER} !important;
      }
      ::selection { background: ${RED}; color: #fff; }
      input::placeholder, textarea::placeholder { color: ${INK_MUTED}; }
    `}</style>
  )
}

// ─── Page ───
export default function ApplyPage() {
  return (
    <div style={{ background: CREAM, color: INK, fontFamily: SANS }}>
      <ApplyStyles />
      <Hero />
      <Cycle />
      <Problem />
      <Reframe />
      <CoreIdea />
      <Offer />
      <WhatYouGet />
      <Pricing />
      <FinalCTA />
      <Footer />
    </div>
  )
}
